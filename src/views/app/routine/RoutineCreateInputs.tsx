/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useState } from "react";
import {
  useForm,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import { Button } from "~/components/common/Button";
import { InputDate } from "~/components/common/InputDate";
import { InputGroup } from "~/components/common/InputGroup";
import { InputText } from "~/components/common/InputText";
import { StateButton } from "~/components/common/StateButton";
import { RoutineMode } from "~/types/Models";
import { type CreateRoutineDto } from "~/types/routine/create-routine.dto";

interface UseFormProps {
  setValue: UseFormSetValue<CreateRoutineDto>;
  register: UseFormRegister<CreateRoutineDto>;
  watch: UseFormWatch<CreateRoutineDto>;
}

interface RoutineCreateInputsParams {
  mode: RoutineMode;
  props: UseFormProps;
}

const WeeklyRoutineInputs = ({ register, watch, setValue }: UseFormProps) => {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const textMap: Record<number, string> = {
    0: "Segunda-Feira",
    1: "Terça-Feira",
    2: "Quarta-Feira",
    3: "Quinta-Feira",
    4: "Sexta-Feira",
    5: "Sábado",
    6: "Domingo",
  };

  const toggle = (dayNumber: number) => {
    if (weekDays.includes(dayNumber))
      setWeekDays((prev) => prev.filter((number) => number !== dayNumber));
    else setWeekDays((prev) => [...prev, dayNumber]);
  };

  useEffect(() => {
    setValue("weekDays", weekDays);
  }, [weekDays, setValue]);

  return (
    <>
      <InputGroup label="Dias da semana">
        <div className="grid grid-cols-7 gap-2">
          {[0, 1, 2, 3, 4, 5, 6].map((number) => (
            <StateButton
              key={`day-select-${number}`}
              selected={weekDays.includes(number)}
              onClick={() => toggle(number)}
              type="button"
              className="flex flex-col"
            >
              <div className="">📆</div>
              <div className="text-xs">{textMap[number]}</div>
            </StateButton>
          ))}
        </div>
      </InputGroup>
    </>
  );
};

const MonthlyRoutineInputs = ({ register, setValue }: UseFormProps) => {
  const [animRef] = useAutoAnimate();
  const [days, setDays] = useState<number[]>([]);
  const { register: dayRegister, getValues: dayGetValues } = useForm<{
    dayNumber: number;
  }>();

  const add = () => {
    const { dayNumber } = dayGetValues();
    if (days.includes(dayNumber)) return;
    setDays((prev) => [...prev, Number(dayNumber)]);
  };

  const remove = (day: number) => {
    setDays((prev) => prev.filter((dayI) => dayI !== day));
  };

  useEffect(() => {
    setValue("monthDays", days);
  }, [days, setValue]);

  return (
    <>
      <InputGroup label="Dias do mês">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-row gap-2">
            <InputText
              paramName="dayNumber"
              register={dayRegister}
              placeholder="Dia"
              type="number"
              className="grow"
            />
            <Button className="w-min" onClick={() => add()} type="button">
              +
            </Button>
          </div>
          <div
            className="flex flex-row flex-wrap items-center gap-1"
            ref={animRef}
          >
            {days.map((day) => (
              <button
                key={`month-day-${day}`}
                className="flex flex-col items-center justify-center rounded-lg px-3 py-1 shadow-md transition hover:bg-gray-200"
                onClick={() => remove(day)}
                type="button"
              >
                <div className="">📆</div>
                <div className="text-xs font-bold">{day}</div>
              </button>
            ))}
          </div>
        </div>
      </InputGroup>
    </>
  );
};

const DayCountRoutineInputs = ({
  register,
  watch,
  setValue,
}: {
  register: UseFormRegister<CreateRoutineDto>;
  watch: UseFormWatch<CreateRoutineDto>;
  setValue: UseFormSetValue<CreateRoutineDto>;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputGroup label="A cada quantos dias:">
        <InputText
          paramName="dayCount"
          type="number"
          register={register}
          placeholder=""
        />
      </InputGroup>
      <InputGroup label="Iniciar em">
        <InputDate<CreateRoutineDto>
          setValue={setValue}
          paramName="targetDate"
          className="relative z-[199]"
          watch={watch}
          placeholder="Padrão - Hoje"
        />
      </InputGroup>
    </div>
  );
};

const MonthCountRoutineInputs = ({
  register,
  watch,
  setValue,
}: {
  register: UseFormRegister<CreateRoutineDto>;
  watch: UseFormWatch<CreateRoutineDto>;
  setValue: UseFormSetValue<CreateRoutineDto>;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <InputGroup label="À cada X meses:">
        <InputText
          paramName="monthCount"
          type="number"
          register={register}
          placeholder=""
        />
      </InputGroup>
      <InputGroup label="Dia:">
        <InputText
          paramName="dayCount"
          type="number"
          register={register}
          placeholder=""
        />
      </InputGroup>
      <InputGroup label="Iniciar em">
        <InputDate<CreateRoutineDto>
          setValue={setValue}
          paramName="targetDate"
          className="relative z-[199]"
          watch={watch}
          placeholder="Padrão - Hoje"
        />
      </InputGroup>
    </div>
  );
};

export const RoutineCreateInputs = ({
  mode,
  props,
}: RoutineCreateInputsParams) => {
  const [animRef] = useAutoAnimate();

  return (
    <div ref={animRef}>
      {mode === RoutineMode.WEEKLY && <WeeklyRoutineInputs {...props} />}
      {mode === RoutineMode.DAY_COUNT && <DayCountRoutineInputs {...props} />}
      {mode === RoutineMode.MONTHLY && <MonthlyRoutineInputs {...props} />}
      {mode === RoutineMode.MONTH_COUNT && (
        <MonthCountRoutineInputs {...props} />
      )}
    </div>
  );
};
