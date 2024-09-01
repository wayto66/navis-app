import { TaskStatus } from "~/types/Models";

export const TaskStatusChip = ({ status }: { status: TaskStatus }) => {
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
    [TaskStatus.DEFINE_DEADLINE]: "📆 Definir Prazo",
    [TaskStatus.PENDING]: "💤 Pendente",
    [TaskStatus.IN_PROGRESS]: "🔨 Em Progresso",
    [TaskStatus.IN_APPROVAL]: "🕵️‍♀️ Em Aprovação",
    [TaskStatus.IN_CHANGE]: "🚧 alteração",
    [TaskStatus.COMPLETED]: "✅ finalizada",
    [TaskStatus.CANCELLED]: "❌ cancelada",
    [TaskStatus.LOCKED]: "🔒 travada",
  };

  return (
    <div
      className={`rounded-lg ${colorMap[status]} px-4 py-1 text-center text-xs font-semibold uppercase tracking-tighter text-white shadow-md`}
    >
      {textMap[status]}
    </div>
  );
};
