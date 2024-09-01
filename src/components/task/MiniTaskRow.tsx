import Image from "next/image";
import { useContext } from "react";
import { reactContext } from "~/context";
import { type Task } from "~/types/Models";
import { TaskStatusLabel } from "../labels/TaskStatusLabel";

interface MiniTaskRowParams {
  className?: string;
  task: Task;
  onClick: () => void;
}

export const MiniTaskRow = ({
  task,
  className,
  onClick,
}: MiniTaskRowParams) => {
  const ctx = useContext(reactContext);
  const { users, customers } = ctx.data;

  const assignee = users.find((user) => user.id === task.assignedId);
  const creator = users.find((user) => user.id === task.creatorId);
  const customer = customers.find(
    (customer) => customer.id === task.customerId,
  );

  let targetDate = "?";
  if (task.targetDate) {
    const date = new Date(task.targetDate);
    targetDate = date.toLocaleDateString("pt-BR");
  }

  const creationDate = new Date(task.createdAt).toLocaleDateString("pt-BR");
  return (
    <div
      className={`${className} flex cursor-pointer flex-row items-center justify-start gap-4 transition hover:bg-gray-100`}
      onClick={onClick}
    >
      <div className="flex basis-[10%] text-xs font-semibold tracking-tight text-gray-700">
        {targetDate}
      </div>
      <TaskStatusLabel status={task.status} className="flex basis-[5%]" />
      <div className="col-span-2 flex basis-[45%] flex-col justify-start">
        <span className="mb-[-7px] text-xs font-semibold text-gray-400">
          #{task.id}
        </span>
        <span className="">{task.title}</span>
      </div>
      <div className="flex basis-[10%] justify-start">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 rounded-full bg-primary">
            {customer?.image && (
              <Image
                alt="user-icon"
                width={64}
                height={64}
                src={customer.image}
                className="h-full w-full rounded-full object-cover"
              />
            )}
          </div>
          <span className="mt-[-5px] text-xs tracking-tighter">
            {customer?.name}
          </span>
        </div>
      </div>
      <div className="flex basis-[10%] justify-start">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 rounded-full bg-primary">
            {assignee?.image && (
              <Image
                alt="user-icon"
                width={64}
                height={64}
                src={assignee.image}
                className="h-full w-full rounded-full object-cover"
              />
            )}
          </div>
          <span className="mt-[-5px] text-xs tracking-tighter">
            {assignee?.name}
          </span>
        </div>
      </div>
      <div className="flex basis-[10%] flex-row items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 rounded-full bg-primary">
            {creator?.image && (
              <Image
                alt="user-icon"
                width={64}
                height={64}
                src={creator.image}
                className="h-full w-full rounded-full object-cover"
              />
            )}
          </div>
          <span className="mt-[-5px] text-xs tracking-tighter">
            {creator?.name}
          </span>
        </div>
        <span className="text-xs tracking-tighter">em {creationDate}</span>
      </div>
    </div>
  );
};
