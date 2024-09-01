import { Icon } from "@iconify/react/dist/iconify.js";
import { type SortOrder } from "~/types/Sort";

export interface TableHeaderCellParams {
  label: string;
  paramName: string;
  onClick: (param: string | undefined) => void;
  sortTarget: string | undefined;
  sortOrder: SortOrder;
  className?: string;
}

export const TableHeaderCell = ({
  label,
  onClick,
  paramName,
  sortOrder,
  sortTarget,
  className,
}: TableHeaderCellParams) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-between gap-4 text-start text-sm font-semibold uppercase tracking-tight text-gray-600`}
      onClick={() => onClick(paramName)}
    >
      {label}
      {sortTarget === paramName && (
        <div className="flex grow flex-row items-center gap-2">
          <div className="h-[1px] min-w-2 grow bg-gray-300"></div>
          {sortOrder === "asc" ? (
            <Icon icon={"mdi:chevron-up"} fontSize={20} />
          ) : (
            <Icon icon={"mdi:chevron-down"} fontSize={20} />
          )}
        </div>
      )}
    </button>
  );
};
