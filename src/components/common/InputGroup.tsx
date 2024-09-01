export interface InputGroupParams {
  children: JSX.Element | JSX.Element[];
  label: string;
  className?: string;
}

export const InputGroup = ({
  children,
  label,
  className,
}: InputGroupParams) => {
  return (
    <div className={`${className} flex flex-col gap-1`}>
      <label
        htmlFor=""
        className="text-xs font-semibold tracking-tight text-gray-700"
      >
        {label}
      </label>
      {children}
    </div>
  );
};
