import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

export interface TextAreaParams<T extends FieldValues> {
  className?: string;
  register: UseFormRegister<T>;
  paramName: Path<T>;
  placeholder: string;
  rows?: number;
  cols?: number;
  disabled?: boolean;
  required?: boolean;
}

export const TextArea = <T extends FieldValues>({
  className,
  register,
  paramName,
  placeholder,
  rows,
  cols,
  disabled,
  required,
}: TextAreaParams<T>) => {
  return (
    <textarea
      placeholder={placeholder}
      className={
        "relative appearance-none rounded-lg py-2 pl-4 pr-8 outline outline-1 outline-gray-200 transition hover:outline-gray-400 focus:shadow-md focus:shadow-primary focus:outline-primary" +
        className
      }
      rows={rows}
      cols={cols}
      disabled={disabled}
      required={required}
      {...register(paramName)}
    ></textarea>
  );
};
