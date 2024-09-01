export interface StateButtonParams {
  children: JSX.Element[] | JSX.Element | string;
  className?: string;
  onClick?: (d?: unknown) => unknown;
  layout?: "primary" | "secondary" | "tertiary" | "dark" | "cancel" | "light";
  selected: boolean;
  type?: "button" | "submit" | "reset";
}

const baseClassNames =
  "transiton flex w-full items-center justify-center rounded-lg px-4 py-2 text-center font-semibold shadow-xl";

const PrimaryButton = ({
  children,
  className,
  onClick,
  selected,
  type,
}: StateButtonParams) => {
  const selectDependantClasses = selected
    ? "from-primary via-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
    : "from-gray-500  to-gray-600 hover:from-gray-400 hover:to-gray-500";
  return (
    <button
      className={`${className} ${baseClassNames} ${selectDependantClasses} bg-gradient-to-r text-white`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

const typeMap: Record<string, (data: StateButtonParams) => JSX.Element> = {
  primary: PrimaryButton,
};

export const StateButton = ({
  children,
  className,
  onClick,
  selected,
  type,
  layout,
}: StateButtonParams) => {
  const TypeButton = typeMap[layout ?? "primary"];
  if (!TypeButton) return <></>;
  return (
    <TypeButton
      className={className}
      onClick={onClick}
      selected={selected}
      type={type}
    >
      {children}
    </TypeButton>
  );
};
