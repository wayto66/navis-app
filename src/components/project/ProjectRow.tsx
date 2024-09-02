import Image from "next/image";
import { useContext, useMemo } from "react";
import { reactContext } from "~/context";
import { TaskStatus, type Project } from "~/types/Models";
import { TaskPriorityChip } from "../chips/TaskPriorityChip";
import { TaskStatusChip } from "../chips/TaskStatusChip";

interface ProjectRowParams {
  className?: string;
  project: Project;
  onClick: () => void;
}

export const ProjectRow = ({
  project,
  className,
  onClick,
}: ProjectRowParams) => {
  const ctx = useContext(reactContext);
  const { users, customers } = ctx.data;

  const user = users.find((user) => user.id === project.userId);
  const customer = customers.find(
    (customer) => customer.id === project.customerId,
  );

  let targetDate = "?";
  if (project.targetDate) {
    const date = new Date(project.targetDate);
    targetDate = date.toLocaleDateString("pt-BR");
  }

  const creationDate = new Date(project.createdAt).toLocaleDateString("pt-BR");

  const progressBar = useMemo(() => {
    if (!project.tasks) return <></>;
    const total = project.tasks.length;
    const done = project.tasks.filter(
      (task) => task.status === TaskStatus.COMPLETED,
    ).length;
    return (
      <div className="flex flex-col">
        <div className="h-4 w-16 rounded-sm bg-gradient-to-r from-gray-600 to-gray-800">
          <div
            className={`h-4 bg-gradient-to-r from-emerald-400 to-green-500`}
            style={{ width: `${(done / total) * 100}%` }}
          ></div>
        </div>
        <div className="w-full text-end text-xs font-semibold text-gray-500">
          {done}/{total}
        </div>
      </div>
    );
  }, [project.tasks]);
  return (
    <div
      className={`${className} grid cursor-pointer grid-cols-8 items-center justify-center gap-4 transition hover:bg-gray-100`}
      onClick={onClick}
    >
      <div className="font-semibold tracking-tight text-gray-700">
        {targetDate}
      </div>
      <TaskStatusChip status={project.status} />
      <TaskPriorityChip priority={project.priority} />
      <div className="col-span-2 flex flex-col justify-start">
        <span className="mb-[-7px] text-xs font-semibold text-gray-400">
          #{project.id}
        </span>
        <span className="">{project.title}</span>
      </div>
      <div className="flex justify-start">{progressBar}</div>
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

      <div className="flex flex-col items-start">
        <div className="flex flex-col items-start">
          <div className="h-8 w-8 rounded-lg bg-primary">
            {user?.image && (
              <Image
                alt="user-icon"
                width={64}
                height={64}
                src={user.image}
                className="h-full w-full rounded-lg object-cover"
              />
            )}
          </div>
        </div>
        <span className="text-xs tracking-tighter">em {creationDate}</span>
      </div>
    </div>
  );
};
