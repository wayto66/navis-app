interface DividerParams {
  className?: string;
}

export const Divider = ({ className }: DividerParams) => {
  return <div className={`h-[1px] w-full bg-gray-300 ${className}`}></div>;
};
