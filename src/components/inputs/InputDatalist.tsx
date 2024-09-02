/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Icon } from "@iconify/react/dist/iconify.js";
import { type ChangeEvent } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormSetValue,
} from "react-hook-form";

interface InputDatalistParams<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  paramName: Path<T>;
  children: JSX.Element | JSX.Element[];
  placeholder?: string;
  valueParser?: (value?: any) => any;
  className?: string;
}

export const InputDatalist = <T extends FieldValues>({
  paramName,
  setValue,
  children,
  placeholder,
  valueParser,
  className,
}: InputDatalistParams<T>) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (
      valueParser ? valueParser(e.target.value) : e.target.value
    ) as PathValue<T, Path<T>>;
    setValue(paramName, value);
  };

  return (
    <div className={`${className} relative`}>
      <input
        className="no-caret w-full appearance-none rounded-lg border px-4 py-1"
        list={paramName}
        placeholder={placeholder}
        onChange={handleChange}
      />

      <datalist id={paramName} className="appearance-none">
        {children}
      </datalist>
      <Icon
        icon={"mdi:chevron-down"}
        color="black"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform"
      />
    </div>
  );
};
