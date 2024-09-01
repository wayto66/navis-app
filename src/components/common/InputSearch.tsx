import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

export interface InputTextParams<T extends FieldValues> {
  className?: string;
  register: UseFormRegister<T>;
  paramName: Path<T>;
  placeholder: string;
}

export const InputText = <T extends FieldValues>({
  className,
  register,
  paramName,
  placeholder,
}: InputTextParams<T>) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={
        "focus:outline-primary focus:shadow-primary relative appearance-none rounded-lg py-2 pl-4 pr-8 outline outline-1 outline-gray-200 transition hover:outline-gray-400 focus:shadow-md" +
        className
      }
      {...register(paramName)}
    ></input>
  );
};
