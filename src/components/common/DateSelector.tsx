import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormSetValue,
} from "react-hook-form";
import { Button } from "./Button";
import { InputDateRange } from "./InputDateRange";
import { StateButton } from "./StateButton";

export interface DateSelectorParams<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
}

type DateMode = "custom" | "today" | "7d" | "15d" | "30d";

const getDatesByMode = (mode: DateMode): [Date, Date] => {
  if (mode === "custom") throw new Error("Forbidden");
  const dayAddMap: Record<DateMode, number> = {
    custom: 0,
    today: 1,
    "7d": 7,
    "15d": 15,
    "30d": 30,
  };
  const dateFrom = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
    ),
  );
  const dateTo = new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate() + dayAddMap[mode],
    ),
  );

  return [dateFrom, dateTo];
};

export const DateSelector = <T extends FieldValues>({
  setValue,
}: DateSelectorParams<T>) => {
  const [mode, setMode] = useState<DateMode>("7d");

  const selectMode = (mode: DateMode) => {
    if (mode !== "custom")
      setValue(
        "dateRange" as Path<T>,
        getDatesByMode(mode) as PathValue<T, Path<T>>,
      );

    setMode(mode);
  };

  const reset = () => {
    setMode("custom");
    setValue("dateRange" as Path<T>, undefined as PathValue<T, Path<T>>);
  };

  return (
    <div className="flex flex-col gap-2">
      <button className="w-full" onClick={() => selectMode("custom")}>
        <InputDateRange
          className="w-full"
          paramName={"dateRange" as Path<T>}
          setValue={setValue}
        />
      </button>
      <div className="grid grid-cols-5 gap-2">
        <Button
          layout="cancel"
          onClick={() => reset()}
          className="!bg-gray-600"
        >
          <Icon icon={"system-uicons:reset"} />
        </Button>
        <StateButton
          selected={mode === "today"}
          onClick={() => selectMode("today")}
        >
          Hoje
        </StateButton>
        <StateButton selected={mode === "7d"} onClick={() => selectMode("7d")}>
          7D
        </StateButton>
        <StateButton
          selected={mode === "15d"}
          onClick={() => selectMode("15d")}
        >
          15D
        </StateButton>{" "}
        <StateButton
          selected={mode === "30d"}
          onClick={() => selectMode("30d")}
        >
          30D
        </StateButton>
      </div>
    </div>
  );
};
