import { getDaysDifference } from "~/utils/getDaysDifference";

interface RemainingDaysChipParams {
  deadline: Date;
}

export const RemainingDaysChip = ({ deadline }: RemainingDaysChipParams) => {
  const getRemainingDaysChipColor = (days: number) => {
    if (days < 0) return "bg-red-700";
    if (days === 0) return "bg-red-500";
    if (days < 2) return "bg-orange-400";
    if (days < 7) return "bg-blue-400";
    return "bg-teal-500";
  };

  const remainingDays = getDaysDifference(new Date(), deadline);
  return (
    <div
      className={`flex h-full items-center justify-center rounded-lg text-center ${getRemainingDaysChipColor(remainingDays)} px-3 py-1 font-semibold tracking-tight text-white`}
    >
      📅 {remainingDays} Dias
    </div>
  );
};
