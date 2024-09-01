import { Icon } from "@iconify/react/dist/iconify.js";
import {
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

export interface InputSelectParams<T extends FieldValues> {
  children: JSX.Element | JSX.Element[];
  className?: string;
  register: UseFormRegister<T>;
  paramName: Path<T>;
  disabled?: boolean;
}

export const InputSelect = <T extends FieldValues>({
  children,
  className,
  register,
  paramName,
  disabled,
}: InputSelectParams<T>) => {
  return (
    <div className="relative">
      <select
        className={
          "relative w-full appearance-none rounded-lg py-2 pl-4 pr-8 outline outline-1 outline-gray-200 transition hover:outline-gray-400 focus:shadow-md focus:shadow-primary focus:outline-primary" +
          className
        }
        disabled={disabled}
        {...register(paramName)}
      >
        {children}
      </select>
      {!disabled && (
        <Icon
          icon={"mdi:chevron-down"}
          color="black"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform"
        />
      )}
    </div>
  );
};
