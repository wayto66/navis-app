/* eslint-disable react-hooks/exhaustive-deps */
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/common/Button";
import { DateSelector } from "~/components/common/DateSelector";
import { Divider } from "~/components/common/Divider";
import { InputSelect } from "~/components/common/InputSelect";
import { InputText } from "~/components/common/InputText";
import { Table } from "~/components/table/Table";
import useDebounce from "~/hooks/useDebounce";
import { getTask } from "~/services/task/getTask";
import { getTasks, type GetTasksParams } from "~/services/task/getTasks";
import { TaskStatus, type Task } from "~/types/Models";
import { type SortOrder, type SortTarget } from "~/types/Sort";
import { CustomerOptions } from "~/views/app/customer/CustomerOptions";

import { TaskCreateView } from "~/views/app/task/TaskCreateView";
import { TaskEditView } from "~/views/app/task/TaskEditView";
import { TaskList } from "~/views/app/task/TaskList";
import { UserOptions } from "~/views/app/user/UserOptions";

const TaskListPage: NextPage = () => {
  const router = useRouter();
  const { register, setValue, watch, getValues } = useForm<GetTasksParams>();
  const [taskListRef] = useAutoAnimate({
    duration: 150,
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [sortTarget, setSortTarget] = useState<SortTarget | undefined>(
    "targetDate",
  );
  const [taskCreateViewVisible, setTaskCreateViewVisible] = useState(false);
  const [taskEditViewVisible, setTaskEditViewVisible] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>();
  const debouncedTitle = useDebounce(watch("title"), 500);

  const closeTaskCreateView = async (update?: boolean) => {
    if (update) await loadTasks();
    setTaskCreateViewVisible(false);
  };
  const openTaskCreateView = () => setTaskCreateViewVisible(true);
  const closeTaskEditView = async (update?: boolean) => {
    if (update) await loadTasks();
    setTaskEditViewVisible(false);
  };
  const openTaskEditView = (task: Task) => {
    setCurrentTask(task);
    setTaskEditViewVisible(true);
  };

  const loadTasks = async () => {
    const searchValues = getValues();
    const newTasks = await getTasks({ ...searchValues, page: 1 });
    setTasks(newTasks ?? []);
  };

  const handleReorder = (target: SortTarget | undefined) => {
    if (target !== sortTarget) {
      setSortOrder("asc");
      setSortTarget(target);
      return;
    }
    if (sortOrder === "dsc") {
      setSortTarget(undefined);
      return;
    }
    if (sortOrder === "asc") {
      setSortOrder("dsc");
      return;
    }
    setSortOrder("asc");
  };

  const checkTaskIdInUrl = async () => {
    const { task_id } = router.query;
    const taskId = Number(task_id);
    if (isNaN(taskId)) return;
    const task = await getTask({ id: taskId });
    if (!task) {
      toast.error(`Solicitação com id #${taskId} não encontrada.`);
      return;
    }
    openTaskEditView(task);
  };

  useEffect(() => {
    void loadTasks();
  }, [
    debouncedTitle,
    watch("customerId"),
    watch("userId"),
    watch("status"),
    watch("dateRange"),
  ]);

  useEffect(() => {
    void checkTaskIdInUrl();
  }, [router.query]);

  return (
    <main className="flex min-h-screen w-full items-start justify-center">
      {taskCreateViewVisible && (
        <TaskCreateView handleClose={closeTaskCreateView} />
      )}
      {taskEditViewVisible && (
        <TaskEditView
          handleClose={closeTaskEditView}
          taskId={currentTask?.id}
        />
      )}

      <div className="flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-white shadow-md">
        <div className="flex w-full items-center justify-start px-8 pt-8 text-2xl font-semibold text-dark">
          <h2>Filtros</h2>
        </div>
        <div className="grid w-full grid-cols-4 items-start justify-center justify-between gap-8 px-8">
          <DateSelector<GetTasksParams> setValue={setValue} />
          <InputSelect register={register} className="grow" paramName="userId">
            <option value={""}>Selecionar Usuário</option>
            <UserOptions />
          </InputSelect>
          <InputSelect
            register={register}
            className="grow"
            paramName="customerId"
          >
            <option value={""}>Selecionar Cliente</option>
            <CustomerOptions />
          </InputSelect>
          <InputSelect register={register} className="grow" paramName="status">
            <option value={""}>Selecionar Estado</option>
            <option value={TaskStatus.DEFINE_DEADLINE}>📆 Definir Prazo</option>
            <option value={TaskStatus.PENDING}>💤 Pendente</option>
            <option value={TaskStatus.IN_PROGRESS}>🔨 Em Progresso</option>
            <option value={TaskStatus.IN_CHANGE}>🚧 Em Alteração</option>
            <option value={TaskStatus.IN_APPROVAL}>🕵️‍♀️ Em Aprovação</option>
            <option value={TaskStatus.COMPLETED}>✅ Finalizada</option>
            <option value={TaskStatus.CANCELLED}>❌ Cancelada</option>
            <option value={TaskStatus.LOCKED}>🔒 Travada</option>
          </InputSelect>
        </div>

        <Divider />
        <div className="flex w-full flex-row gap-8 px-8">
          <InputSelect register={register} paramName="pageSize">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </InputSelect>
          <div className="ml-auto flex gap-8">
            <InputText
              paramName="title"
              register={register}
              placeholder="Pesquisar por..."
              className="ml-auto"
              icon={"material-symbols:search"}
            />
            <Button
              className="flex !w-max flex-row gap-2"
              onClick={openTaskCreateView}
            >
              <Icon icon="ic:baseline-plus" />
              <span className="w-max">Nova solicitação</span>
            </Button>
          </div>
        </div>
        <Divider />
        <Table
          cols={8}
          heads={[
            {
              label: "Prazo",
              paramName: "targetDate",
            },
            {
              label: "Estado",
              paramName: "status",
            },
            {
              label: "Prioridade",
              paramName: "priority",
            },
            {
              label: "Título",
              paramName: "title",
              className: "col-span-2",
            },
            {
              label: "Cliente",
              paramName: "customerId",
            },
            {
              label: "Responsável",
              paramName: "assignedId",
            },
            {
              label: "Criado",
              paramName: "creatorId",
            },
          ]}
        >
          <TaskList tasks={tasks} onClick={openTaskEditView} />
        </Table>
      </div>
    </main>
  );
};

export default TaskListPage;
