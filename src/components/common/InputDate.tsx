import { useMemo } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import { DatePicker } from "rsuite";

export interface InputDateParams<T extends FieldValues> {
  className?: string;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  paramName: Path<T>;
  placeholder?: string;
  disabled?: boolean;
}

export const InputDate = <T extends FieldValues>({
  className,
  setValue,
  watch,
  paramName,
  placeholder,
  disabled,
}: InputDateParams<T>) => {
  const handleChange = (e: Date | null) => {
    const value = e as PathValue<T, Path<T>>;
    if (!value) return;
    setValue(paramName, value);
  };

  const value = useMemo(() => {
    return new Date(watch(paramName));
  }, [watch(paramName)]);
  return (
    <DatePicker
      format="dd.MM.yyyy"
      placeholder={placeholder ?? "À definir"}
      className={className}
      onChange={(e) => handleChange(e)}
      value={value}
      disabled={disabled}
    />
  );
};
