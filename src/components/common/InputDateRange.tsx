import ptBR from "date-fns/locale/pt-BR";
import {
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormSetValue,
} from "react-hook-form";
import { DateRangePicker } from "rsuite";
import { type DateRange } from "rsuite/esm/DateRangePicker";

export interface InputDateParams<T extends FieldValues> {
  className?: string;
  setValue: UseFormSetValue<T>;
  paramName: Path<T>;
}

const locale = {
  sunday: "Dom",
  monday: "Seg",
  tuesday: "Ter",
  wednesday: "Qua",
  thursday: "Qui",
  friday: "Sex",
  saturday: "Sab",
  ok: "OK",
  today: "Hoje",
  yesterday: "Ontem",
  hours: "Horas",
  minutes: "Minutos",
  seconds: "Segundos",
  formattedMonthPattern: "MMM yyyy",
  formattedDayPattern: "dd MMM yyyy",
  dateLocale: ptBR,

  // for DateRangePicker
  last7Days: "Últimos 7 dias",
};

export const InputDateRange = <T extends FieldValues>({
  className,
  setValue,
  paramName,
}: InputDateParams<T>) => {
  const handleChange = (e: DateRange | null) => {
    const value = e as PathValue<T, Path<T>>;

    setValue(paramName, value);
  };
  return (
    <DateRangePicker
      locale={locale}
      format="dd.MM.yyyy"
      placeholder="Intervalo"
      className={"h-full " + className}
      onChange={(e) => handleChange(e)}
    />
  );
};
