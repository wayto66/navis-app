import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";
import { type Routine } from "~/types/Models";
import { RoutineStatusLabel } from "../labels/RoutineStatusLabel";

interface MicroRoutineRowParams {
  routine: Routine;
  removeDependantRoutine: (routine: Routine) => void;
}

export const MicroRoutineRow = ({
  routine,
  removeDependantRoutine,
}: MicroRoutineRowParams) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) autoAnimate(ref.current);
  }, [ref]);
  return (
    <div
      className="flex flex-row overflow-hidden rounded-lg border"
      key={`dep-routine-${routine.id}`}
      ref={ref}
    >
      <div className="flex flex-row items-center gap-1 px-2 py-1">
        <RoutineStatusLabel status={routine.status} />
        <span className="text-xs font-semibold text-gray-600">
          #{routine.id}
        </span>

        {routine.title}
      </div>
      <button
        className="ml-auto bg-primary px-2 py-1 text-xs font-extrabold uppercase tracking-tighter text-white transition hover:bg-tertiary"
        type="button"
        onClick={() => removeDependantRoutine(routine)}
      >
        X
      </button>
    </div>
  );
};
