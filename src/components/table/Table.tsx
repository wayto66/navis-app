import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useState } from "react";

import { type SortOrder } from "~/types/Sort";
import { Divider } from "../common/Divider";
import { TableHeaderCell } from "./TableHeaderCell";

interface TableHead {
  label: string;
  paramName: string;
  className?: string;
}

interface TableParams {
  heads: TableHead[];
  children: JSX.Element;
  cols: number;
}

export const Table = ({ heads, children, cols }: TableParams) => {
  const [listRef] = useAutoAnimate({
    duration: 150,
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [sortTarget, setSortTarget] = useState<string | undefined>(
    "targetDate",
  );
  const handleReorder = (target: string | undefined) => {
    if (target !== sortTarget) {
      setSortOrder("asc");
      setSortTarget(target);
      return;
    }
    if (sortOrder === "dsc") {
      setSortTarget(undefined);
      return;
    }
    if (sortOrder === "asc") {
      setSortOrder("dsc");
      return;
    }
    setSortOrder("asc");
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div
        className={"grid w-full items-center justify-center gap-4 px-8"}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {heads.map((head) => (
          <TableHeaderCell
            key={`table-head-${Math.random()}`}
            label={head.label}
            onClick={handleReorder}
            paramName={head.paramName}
            sortOrder={sortOrder}
            sortTarget={sortTarget}
            className={head.className}
          />
        ))}
      </div>
      <Divider />
      <div className="flex w-full flex-col" ref={listRef}>
        {React.cloneElement(children, {
          sortOrder,
          sortTarget,
        })}
      </div>
    </div>
  );
};
