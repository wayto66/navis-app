import { useMemo } from "react";
import { Divider } from "~/components/common/Divider";
import { TaskRow } from "~/components/task/TaskRow";
import { type Task } from "~/types/Models";
import { type SortOrder, type SortTarget } from "~/types/Sort";

interface TaskListParams {
  tasks: Task[];
  onClick: (task: Task) => void;
  sortOrder?: SortOrder;
  sortTarget?: SortTarget | undefined;
}

const sortTasks = (
  input_tasks: Task[] | undefined,
  sortOrder?: SortOrder,
  input_sortTarget?: SortTarget | undefined,
): Task[] => {
  const sortOrderFactor = sortOrder === "asc" ? 1 : -1;
  let sortTarget = input_sortTarget;
  if (!sortTarget) sortTarget = "id";
  if (sortTarget === "targetDate")
    return (
      input_tasks?.sort(
        (a, b) =>
          (new Date(a.targetDate ?? "").getTime() -
            new Date(b.targetDate ?? "").getTime()) *
          sortOrderFactor,
      ) ?? []
    );
  if (["id", "customerId", "assignedId"].includes(sortTarget))
    return (
      input_tasks?.sort(
        (a, b) =>
          (Number(a[sortTarget]) - Number(b[sortTarget])) * sortOrderFactor,
      ) ?? []
    );

  return (
    input_tasks?.sort(
      (a, b) =>
        a[sortTarget].toString().localeCompare(b[sortTarget].toString()) *
        sortOrderFactor,
    ) ?? []
  );
};

export const TaskList = ({
  tasks,
  onClick,
  sortOrder,
  sortTarget,
}: TaskListParams) => {
  const taskRows = useMemo(() => {
    const sorted = sortTasks(tasks, sortOrder, sortTarget);
    return sorted.map((task) => {
      return (
        <>
          <TaskRow
            task={task}
            className="px-8 py-4"
            key={`task-${task.id}-r(${Math.random()})`}
            onClick={() => onClick(task)}
          />
          <Divider />
        </>
      );
    });
  }, [tasks, sortOrder, sortTarget]);

  return taskRows;
};
