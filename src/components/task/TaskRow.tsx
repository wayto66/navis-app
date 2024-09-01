import Image from "next/image";
import { useContext } from "react";
import { reactContext } from "~/context";
import { type Task } from "~/types/Models";
import { TaskPriorityChip } from "../chips/TaskPriorityChip";
import { TaskStatusChip } from "../chips/TaskStatusChip";

interface TaskRowParams {
  className?: string;
  task: Task;
  onClick: () => void;
}

export const TaskRow = ({ task, className, onClick }: TaskRowParams) => {
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
      className={`${className} grid cursor-pointer grid-cols-8 items-center justify-center gap-4 transition hover:bg-gray-100`}
      onClick={onClick}
    >
      <div className="font-semibold tracking-tight text-gray-700">
        {targetDate}
      </div>
      <TaskStatusChip status={task.status} />
      <TaskPriorityChip priority={task.priority} />
      <div className="col-span-2 flex flex-col justify-start">
        <span className="mb-[-7px] text-xs font-semibold text-gray-400">
          #{task.id}
        </span>
        <span className="">{task.title}</span>
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
      <div className="flex flex-row items-center gap-2">
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
          <span className="text-xs tracking-tighter">{creator?.name}</span>
        </div>
        <span className="text-xs tracking-tighter">em {creationDate}</span>
      </div>
    </div>
  );
};
