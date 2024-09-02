import { useMemo } from "react";
import { Divider } from "~/components/common/Divider";
import { RoutineRow } from "~/components/routine/RoutineRow";
import { type Routine } from "~/types/Models";
import { type RoutineSortTarget } from "~/types/routine/sort-routine";
import { type SortOrder } from "~/types/Sort";

interface RoutineListParams {
  routines: Routine[];
  onClick: (routine: Routine) => void;
  sortOrder?: SortOrder;
  sortTarget?: RoutineSortTarget | undefined;
}

const sortRoutines = (
  input_routines: Routine[] | undefined,
  sortOrder?: SortOrder,
  input_sortTarget?: RoutineSortTarget | undefined,
): Routine[] => {
  const sortOrderFactor = sortOrder === "asc" ? 1 : -1;
  let sortTarget = input_sortTarget;
  if (!sortTarget) sortTarget = "id";
  if (sortTarget === "targetDate")
    return (
      input_routines?.sort(
        (a, b) =>
          (new Date(a.targetDate ?? "").getTime() -
            new Date(b.targetDate ?? "").getTime()) *
          sortOrderFactor,
      ) ?? []
    );
  if (["id", "customerId", "assignedId"].includes(sortTarget))
    return (
      input_routines?.sort(
        (a, b) =>
          (Number(a[sortTarget]) - Number(b[sortTarget])) * sortOrderFactor,
      ) ?? []
    );

  return (
    input_routines?.sort(
      (a, b) =>
        a[sortTarget].toString().localeCompare(b[sortTarget].toString()) *
        sortOrderFactor,
    ) ?? []
  );
};

export const RoutineList = ({
  routines,
  onClick,
  sortOrder,
  sortTarget,
}: RoutineListParams) => {
  const routineRows = useMemo(() => {
    const sorted = sortRoutines(routines, sortOrder, sortTarget);
    return sorted.map((routine) => {
      return (
        <>
          <RoutineRow
            routine={routine}
            className="px-8 py-4"
            key={`routine-${routine.id}-r(${Math.random()})`}
            onClick={() => onClick(routine)}
          />
          <Divider />
        </>
      );
    });
  }, [routines, sortOrder, sortTarget]);

  return routineRows;
};
