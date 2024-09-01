import { Icon } from "@iconify/react/dist/iconify.js";
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
  icon?: string;
  type?: "text" | "number";
  disabled?: boolean;
  required?: boolean;
}

export const InputText = <T extends FieldValues>({
  className,
  register,
  paramName,
  placeholder,
  icon,
  type,
  disabled,
  required,
}: InputTextParams<T>) => {
  return (
    <div className="relative w-full">
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        className={
          "relative h-full w-full appearance-none rounded-lg py-2 pl-4 pr-8 outline outline-1 outline-gray-200 transition hover:outline-gray-400 focus:shadow-md focus:shadow-primary focus:outline-primary" +
          className
        }
        disabled={disabled}
        required={required}
        {...register(paramName)}
      ></input>
      {icon && (
        <Icon
          icon={icon}
          fontSize={25}
          color="darkgray"
          className="absolute right-[5%] top-[50%] translate-y-[-50%]"
        />
      )}
    </div>
  );
};
