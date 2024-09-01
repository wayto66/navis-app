import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/common/Button";
import { Divider } from "~/components/common/Divider";
import { InputDate } from "~/components/common/InputDate";
import { InputGroup } from "~/components/common/InputGroup";
import { InputSelect } from "~/components/common/InputSelect";
import { InputText } from "~/components/common/InputText";
import { TextArea } from "~/components/common/TextArea";
import { Toggle } from "~/components/common/Toggle";
import { InputDatalist } from "~/components/inputs/InputDatalist";
import { TaskStatusLabel } from "~/components/labels/TaskStatusLabel";
import { MicroTaskRow } from "~/components/task/MicroTaskRow";
import { projectIdInputParser } from "~/helpers/projectIdInputParser";
import useDebounce from "~/hooks/useDebounce";
import { Modal } from "~/layouts/modal";
import { createTask } from "~/services/task/createTask";
import { getTask } from "~/services/task/getTask";
import { getTasks } from "~/services/task/getTasks";
import { TaskPriority, type Task } from "~/types/Models";
import { type CreateTaskDto } from "~/types/task/create-task.dto";
import { CustomerOptions } from "../customer/CustomerOptions";
import { ProjectOptions } from "../project/ProjectOptions";
import { UserOptions } from "../user/UserOptions";

interface TaskCreateViewParams {
  handleClose: (update?: boolean) => void;
}

interface SearchParams {
  searchTerm: string;
}

export const TaskCreateView = ({ handleClose }: TaskCreateViewParams) => {
  // refs
  const [parent] = useAutoAnimate();
  // end refs
  const { data: session } = useSession();
  const { register, setValue, getValues, watch } = useForm<CreateTaskDto>();
  const {
    register: searchRegister,
    watch: searchWatch,
    setValue: searchSetValue,
  } = useForm<SearchParams>();
  const [dependantTasks, setDependantTasks] = useState<Task[]>([]);
  const [foundTask, setFoundTask] = useState<Task>();
  const debouncedSearchTerm: string = useDebounce<string>(
    searchWatch("searchTerm"),
    500,
  );

  const findDependantTask = async () => {
    if (!debouncedSearchTerm) return;
    const numberSearchTerm = Number(debouncedSearchTerm.replace("#", ""));
    if (!isNaN(numberSearchTerm)) {
      const taskId = numberSearchTerm;
      const task = await getTask({ id: taskId });
      setFoundTask(task);
    } else {
      const tasks = await getTasks({
        page: 1,
        pageSize: 5,
        title: debouncedSearchTerm,
      });
      if (!tasks) return;
      setFoundTask(tasks[0]);
    }
  };

  const addDependantTask = (task: Task) => {
    setDependantTasks((prev) => [...prev, task]);
    setFoundTask(undefined);
    searchSetValue("searchTerm", "");
  };

  const removeDependantTask = (task: Task) => {
    setDependantTasks((prev) =>
      prev.filter((depTask) => depTask.id !== task.id),
    );
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session) return;
    const values = getValues();
    const dto: CreateTaskDto = {
      ...values,
      assignedId: Number(values.assignedId),
      customerId: Number(values.customerId),
      dependsOnIds: dependantTasks.map((task) => task.id),
    };

    const task = await createTask({ ...dto, creatorId: session.user.id });
    if (!task?.id) {
      toast.error("Houve um erro ao criar a solicitação");
      return;
    }
    toast.success("Solicitação criada com sucesso!");
    handleClose(true);
  };

  const dependantTasksDisplay = useMemo(() => {
    return dependantTasks.map((task) => (
      <MicroTaskRow
        removeDependantTask={removeDependantTask}
        task={task}
        key={`micro-row-task-${task.id}`}
      />
    ));
  }, [dependantTasks]);

  useEffect(() => {
    void findDependantTask();
  }, [debouncedSearchTerm]);
  return (
    <Modal>
      <div className="animation-spin-y relative flex max-h-[90vh] min-w-[650px] flex-col gap-4 overflow-auto rounded-lg bg-white p-8">
        <div className="absolute left-0 top-0 flex items-center gap-2 rounded-br-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-1 font-bold tracking-tight text-white">
          <Icon icon={"fluent:clipboard-task-add-24-regular"} fontSize={31} />
          <span>Criar Solicitação</span>
        </div>
        <form onSubmit={formSubmit} className="mt-8 flex flex-col gap-2">
          <InputGroup label="Título">
            <InputText<CreateTaskDto>
              register={register}
              paramName="title"
              placeholder="Título"
            />
          </InputGroup>
          <div className="grid grid-cols-3 items-center gap-4">
            <InputGroup label="Projeto" className="col-span-2">
              <InputDatalist<CreateTaskDto>
                paramName="projectId"
                setValue={setValue}
                placeholder={"Digite o nome do projeto"}
                valueParser={projectIdInputParser}
              >
                <ProjectOptions />
              </InputDatalist>
            </InputGroup>
            <div className="flex flex-row items-start gap-2">
              <Toggle<CreateTaskDto>
                register={register}
                parameter="createProject"
              />
              <div className="text-xs font-semibold text-gray-700">
                Criar Novo Projeto
              </div>
            </div>
          </div>
          <InputGroup label="Descrição">
            <TextArea<CreateTaskDto>
              register={register}
              paramName="description"
              placeholder="Descrição"
              rows={6}
            />
          </InputGroup>
          <div className="grid grid-cols-2 gap-6 py-2">
            <InputGroup label="Cliente">
              <InputSelect<CreateTaskDto>
                register={register}
                paramName="customerId"
              >
                <option value={undefined}>Selecionar Cliente</option>
                <CustomerOptions />
              </InputSelect>
            </InputGroup>
            <InputGroup label="Responsável">
              <InputSelect<CreateTaskDto>
                register={register}
                paramName="assignedId"
              >
                <option value={undefined}>Selecionar Responsável</option>
                <UserOptions />
              </InputSelect>
            </InputGroup>
          </div>
          <div className="grid grid-cols-2 gap-6 py-2">
            <InputGroup label="Prioridade">
              <InputSelect<CreateTaskDto>
                register={register}
                paramName="priority"
              >
                <option value={undefined}>Selecionar Prioridade</option>
                <option value={TaskPriority.LOW}>🟢 Baixa</option>
                <option value={TaskPriority.MEDIUM}>🟡 Média</option>
                <option value={TaskPriority.HIGH}>🔴 Alta</option>
                <option value={TaskPriority.URGENT}>🆘 Urgente</option>
              </InputSelect>
            </InputGroup>
            <InputGroup label="Prazo">
              <InputDate<CreateTaskDto>
                setValue={setValue}
                paramName="targetDate"
                className="relative z-[199]"
                watch={watch}
              />
            </InputGroup>
          </div>

          <Divider className="my-4" />

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <InputText
                register={searchRegister}
                paramName="searchTerm"
                placeholder="Buscar dependencias..."
              />
              {foundTask && (
                <div className="flex flex-row overflow-hidden rounded-lg border">
                  <div className="flex flex-row items-center gap-1 px-2 py-1">
                    <TaskStatusLabel status={foundTask.status} />
                    <span className="text-xs font-semibold text-gray-600">
                      #{foundTask.id}
                    </span>

                    {foundTask.title}
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-primary px-2 py-1 text-xs font-extrabold uppercase tracking-tighter text-white transition hover:bg-tertiary"
                    onClick={() => addDependantTask(foundTask)}
                  >
                    add
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2" ref={parent}>
              <div className="text-xs font-semibold text-gray-700">
                Depende de:
              </div>
              {dependantTasksDisplay}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button>Criar</Button>
            <Button layout="cancel" onClick={() => handleClose()}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
