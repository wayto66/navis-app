import Image from "next/image";
import { useContext } from "react";
import { reactContext } from "~/context";
import { type Routine } from "~/types/Models";
import { getDaysDifference } from "~/utils/getDaysDifference";
import { RemainingDaysChip } from "../chips/RemainingDaysChip";
import { RoutineModeChip } from "../chips/RoutineModeChip";

interface RoutineRowParams {
  className?: string;
  routine: Routine;
  onClick: () => void;
}

export const RoutineRow = ({
  routine,
  className,
  onClick,
}: RoutineRowParams) => {
  const ctx = useContext(reactContext);
  const { users, customers } = ctx.data;

  const assignee = users.find((user) => user.id === routine.assignedId);
  const creator = users.find((user) => user.id === routine.creatorId);
  const customer = customers.find(
    (customer) => customer.id === routine.customerId,
  );

  const creationDate = new Date(routine.createdAt).toLocaleDateString("pt-BR");

  const getRemainingDaysChipColor = (days: number) => {
    if (days < 0) return "bg-red-700";
    if (days === 0) return "bg-red-500";
    if (days < 2) return "bg-orange-400";
    if (days < 7) return "bg-blue-400";
    return "bg-teal-500";
  };

  const remainingDays = getDaysDifference(new Date(), routine.targetDate);
  return (
    <div
      className={`${className} grid cursor-pointer grid-cols-7 items-center justify-center gap-4 transition hover:bg-gray-100`}
      onClick={onClick}
    >
      <RemainingDaysChip deadline={routine.targetDate} />
      <RoutineModeChip mode={routine.mode} className="" />

      <div className="col-span-2 flex flex-col justify-start">
        <span className="mb-[-7px] text-xs font-semibold text-gray-400">
          #{routine.id}
        </span>
        <span className="">{routine.title}</span>
      </div>
      <div className="flex justify-start">
        <div className="flex flex-col items-start">
          <div className="h-8 w-8 rounded-lg bg-primary">
            {customer?.image && (
              <Image
                alt="user-icon"
                width={64}
                height={64}
                src={customer.image}
                className="h-full w-full rounded-lg object-cover"
              />
            )}
          </div>
          <span className="text-xs tracking-tighter">{customer?.name}</span>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="flex flex-col items-start">
          <div className="h-8 w-8 rounded-lg bg-primary">
            {assignee?.image && (
              <Image
                alt="user-icon"
                width={64}
                height={64}
                src={assignee.image}
                className="h-full w-full rounded-lg object-cover"
              />
            )}
          </div>
          <span className="text-xs tracking-tighter">{assignee?.name}</span>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 rounded-lg bg-primary">
            {creator?.image && (
              <Image
                alt="user-icon"
                width={64}
                height={64}
                src={creator.image}
                className="h-full w-full rounded-lg object-cover"
              />
            )}
          </div>
        </div>
        <span className="text-xs tracking-tighter">{creationDate}</span>
      </div>
    </div>
  );
};
