/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from "@iconify/react/dist/iconify.js";
import { throttle } from "lodash";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/common/Button";
import { DateSelector } from "~/components/common/DateSelector";
import { Divider } from "~/components/common/Divider";
import { InputSelect } from "~/components/common/InputSelect";
import { InputText } from "~/components/common/InputText";
import { Table } from "~/components/table/Table";
import useDebounce from "~/hooks/useDebounce";
import { getRoutine } from "~/services/routine/getRoutine";
import {
  getRoutines,
  type GetRoutinesParams,
} from "~/services/routine/getRoutines";
import { type Routine } from "~/types/Models";
import { CustomerOptions } from "~/views/app/customer/CustomerOptions";

import { RoutineCreateView } from "~/views/app/routine/RoutineCreateView";
import { RoutineEditView } from "~/views/app/routine/RoutineEditView";
import { RoutineList } from "~/views/app/routine/RoutineList";
import { UserOptions } from "~/views/app/user/UserOptions";

const RoutineListPage: NextPage = () => {
  const router = useRouter();
  const { register, setValue, watch, getValues } = useForm<GetRoutinesParams>();
  const [routineCreateViewVisible, setRoutineCreateViewVisible] =
    useState(false);
  const [routineEditViewVisible, setRoutineEditViewVisible] = useState(false);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [currentRoutine, setCurrentRoutine] = useState<Routine>();
  const debouncedTitle = useDebounce(watch("title"), 500);

  const closeRoutineCreateView = async (update?: boolean) => {
    if (update) await loadRoutines();
    setRoutineCreateViewVisible(false);
  };
  const openRoutineCreateView = () => setRoutineCreateViewVisible(true);
  const closeRoutineEditView = async (update?: boolean) => {
    if (update) await loadRoutines();
    setRoutineEditViewVisible(false);
  };
  const openRoutineEditView = (routine: Routine) => {
    setCurrentRoutine(routine);
    setRoutineEditViewVisible(true);
  };

  const loadRoutines = useCallback(
    throttle(async () => {
      const searchValues = getValues();
      const newRoutines = await getRoutines({ ...searchValues, page: 1 });
      setRoutines(newRoutines ?? []);
    }, 3333),
    [
      debouncedTitle,
      watch("customerId"),
      watch("creatorId"),
      watch("dateRange"),
    ],
  );

  const checkRoutineIdInUrl = async () => {
    const { routine_id } = router.query;
    const routineId = Number(routine_id);
    if (isNaN(routineId)) return;
    const routine = await getRoutine({ id: routineId });
    if (!routine) {
      toast.error(`Solicitação com id #${routineId} não encontrada.`);
      return;
    }
    openRoutineEditView(routine);
  };

  useEffect(() => {
    void loadRoutines();
  }, [loadRoutines]);

  useEffect(() => {
    void checkRoutineIdInUrl();
  }, [router.query]);

  return (
    <main className="flex min-h-screen w-full items-start justify-center">
      {routineCreateViewVisible && (
        <RoutineCreateView handleClose={closeRoutineCreateView} />
      )}
      {routineEditViewVisible && (
        <RoutineEditView
          handleClose={closeRoutineEditView}
          routineId={currentRoutine?.id}
        />
      )}

      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-white shadow-md">
        <div className="flex w-full items-center justify-start px-8 pt-8 text-2xl font-semibold text-dark">
          <h2>Filtros</h2>
        </div>
        <div className="grid w-full grid-cols-4 items-start justify-center justify-between gap-8 px-8">
          <DateSelector<GetRoutinesParams> setValue={setValue} />
          <div className=""></div>
          <InputSelect
            register={register}
            className="grow"
            paramName="assignedId"
          >
            <option value={""}>Selecionar Usuário</option>
            <UserOptions />
          </InputSelect>
          <InputSelect
            register={register}
            className="grow"
            paramName="customerId"
          >
            <option value={""}>Selecionar Cliente</option>
            <CustomerOptions />
          </InputSelect>
        </div>

        <Divider />
        <div className="flex w-full flex-row gap-8 px-8">
          <InputSelect register={register} paramName="pageSize">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </InputSelect>
          <div className="ml-auto flex gap-8">
            <InputText
              paramName="title"
              register={register}
              placeholder="Pesquisar por..."
              className="ml-auto"
              icon={"material-symbols:search"}
            />
            <Button
              className="flex !w-max flex-row gap-2"
              onClick={openRoutineCreateView}
            >
              <Icon icon="ic:baseline-plus" />
              <span className="w-max">Nova rotina</span>
            </Button>
          </div>
        </div>
        <Divider />
        <Table
          cols={7}
          heads={[
            {
              label: "Prazo",
              paramName: "targetDate",
            },
            {
              label: "Modo",
              paramName: "mode",
            },

            {
              label: "Título",
              paramName: "title",
              className: "col-span-2",
            },
            {
              label: "Cliente",
              paramName: "customerId",
            },
            {
              label: "Responsável",
              paramName: "assignedId",
            },
            {
              label: "Criado",
              paramName: "creatorId",
            },
          ]}
        >
          <RoutineList routines={routines} onClick={openRoutineEditView} />
        </Table>
      </div>
    </main>
  );
};

export default RoutineListPage;
