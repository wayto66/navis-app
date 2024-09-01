export interface ButtonParams {
  children: JSX.Element[] | JSX.Element | string;
  className?: string;
  onClick?: (d?: unknown) => unknown;
  layout?: "primary" | "secondary" | "tertiary" | "dark" | "cancel" | "light";
  type?: "button" | "submit" | "reset";
}

const baseClassNames =
  "transiton flex w-full items-center justify-center rounded-lg px-4 py-2 text-center font-semibold shadow-xl";

const PrimaryButton = ({
  children,
  className,
  onClick,
  type,
}: ButtonParams) => {
  return (
    <button
      className={`${className} ${baseClassNames} bg-gradient-to-r from-primary via-primary to-primary/80 text-white hover:from-primary/90 hover:to-primary/70`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

const CancelButton = ({ children, className, onClick }: ButtonParams) => {
  return (
    <button
      className={`${className} ${baseClassNames} bg-gradient-to-r from-gray-300 via-gray-300 to-gray-200 px-4 py-2 text-gray-700 hover:from-gray-300 hover:to-gray-200`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const typeMap: Record<string, (data: ButtonParams) => JSX.Element> = {
  primary: PrimaryButton,
  cancel: CancelButton,
};

export const Button = ({
  children,
  className,
  onClick,
  type,
  layout,
}: ButtonParams) => {
  const TypeButton = typeMap[layout ?? "primary"];
  if (!TypeButton) return <></>;
  return (
    <TypeButton className={className} onClick={onClick} type={type}>
      {children}
    </TypeButton>
  );
};
