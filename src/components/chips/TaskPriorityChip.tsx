import { TaskPriority } from "~/types/Models";

export const TaskPriorityChip = ({ priority }: { priority: TaskPriority }) => {
  const colorMap: Record<TaskPriority, string> = {
    [TaskPriority.LOW]: "bg-emerald-400",
    [TaskPriority.MEDIUM]: "bg-yellow-400",
    [TaskPriority.HIGH]: "bg-orange-400",
    [TaskPriority.URGENT]: "bg-red-400",
  };

  const textMap: Record<TaskPriority, string> = {
    [TaskPriority.LOW]: "Baixa",
    [TaskPriority.MEDIUM]: "Média",
    [TaskPriority.HIGH]: "Alta",
    [TaskPriority.URGENT]: "Urgente",
  };

  return (
    <div
      className={`rounded-lg ${colorMap[priority]} px-4 py-1 text-center text-xs font-semibold uppercase tracking-tighter text-white shadow-md`}
    >
      {textMap[priority]}
    </div>
  );
};
