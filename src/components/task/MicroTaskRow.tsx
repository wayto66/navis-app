import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";
import { type Task } from "~/types/Models";
import { TaskStatusLabel } from "../labels/TaskStatusLabel";

interface MicroTaskRowParams {
  task: Task;
  removeDependantTask: (task: Task) => void;
}

export const MicroTaskRow = ({
  task,
  removeDependantTask,
}: MicroTaskRowParams) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) autoAnimate(ref.current);
  }, [ref]);
  return (
    <div
      className="flex flex-row overflow-hidden rounded-lg border"
      key={`dep-task-${task.id}`}
      ref={ref}
    >
      <div className="flex flex-row items-center gap-1 px-2 py-1">
        <TaskStatusLabel status={task.status} />
        <span className="text-xs font-semibold text-gray-600">#{task.id}</span>

        {task.title}
      </div>
      <button
        className="ml-auto bg-primary px-2 py-1 text-xs font-extrabold uppercase tracking-tighter text-white transition hover:bg-tertiary"
        type="button"
        onClick={() => removeDependantTask(task)}
      >
        X
      </button>
    </div>
  );
};
