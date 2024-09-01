import { TaskStatus } from "~/types/Models";

interface TaskStatusLabelParams {
  status: TaskStatus;
  className?: string;
}
export const TaskStatusLabel = ({
  status,
  className,
}: TaskStatusLabelParams) => {
  const colorMap: Record<TaskStatus, string> = {
    [TaskStatus.DEFINE_DEADLINE]: "bg-gray-400",
    [TaskStatus.PENDING]: "bg-yellow-400",
    [TaskStatus.IN_PROGRESS]: "bg-orange-400",
    [TaskStatus.IN_APPROVAL]: "bg-blue-400",
    [TaskStatus.IN_CHANGE]: "bg-purple-400",
    [TaskStatus.COMPLETED]: "bg-emerald-400",
    [TaskStatus.CANCELLED]: "bg-red-400",
    [TaskStatus.LOCKED]: "bg-yellow-800",
  };

  const textMap: Record<TaskStatus, string> = {
    [TaskStatus.DEFINE_DEADLINE]: "📆",
    [TaskStatus.PENDING]: "💤",
    [TaskStatus.IN_PROGRESS]: "🔨",
    [TaskStatus.IN_APPROVAL]: "🕵️‍♀️",
    [TaskStatus.IN_CHANGE]: "🚧",
    [TaskStatus.COMPLETED]: "✅",
    [TaskStatus.CANCELLED]: "❌",
    [TaskStatus.LOCKED]: "🔒",
  };

  return (
    <div
      className={`rounded-full ${className} ${colorMap[status]} px-1 py-1 text-center text-xs font-semibold uppercase tracking-tighter text-white shadow-md`}
    >
      {textMap[status]}
    </div>
  );
};
