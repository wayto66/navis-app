import { RoutineMode } from "~/types/Models";

export const RoutineModeChip = ({
  mode,
  className,
}: {
  mode: RoutineMode;
  className?: string;
}) => {
  const colorMap: Record<RoutineMode, string> = {
    [RoutineMode.DAY_COUNT]: "bg-violet-400",
    [RoutineMode.WEEKLY]: "bg-yellow-400",
    [RoutineMode.MONTH_COUNT]: "bg-orange-400",
    [RoutineMode.MONTHLY]: "bg-blue-400",
  };

  const textMap: Record<RoutineMode, string> = {
    [RoutineMode.DAY_COUNT]: "📆 Cada x Dias",
    [RoutineMode.WEEKLY]: "💤 Semanal",
    [RoutineMode.MONTH_COUNT]: "🔨 Cada x Meses",
    [RoutineMode.MONTHLY]: "🕵️‍♀️ Menal",
  };

  return (
    <div
      className={`rounded-lg ${colorMap[mode]} ${className} px-4 py-1 text-center text-xs font-semibold uppercase tracking-tighter text-white shadow-md`}
    >
      {textMap[mode]}
    </div>
  );
};
