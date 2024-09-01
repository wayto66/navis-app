import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

export interface InputCheckboxParams<T extends FieldValues> {
  className?: string;
  register: UseFormRegister<T>;
  paramName: Path<T>;
  label: string;
}

export const InputCheckbox = <T extends FieldValues>({
  className,
  register,
  paramName,
  label,
}: InputCheckboxParams<T>) => {
  return (
    <div className={`${className} flex flex-row gap-2`}>
      <input type="checkbox" {...register(paramName)} />
      <label htmlFor="">{label}</label>
    </div>
  );
};
