import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/common/Button";
import { Divider } from "~/components/common/Divider";
import { IconButton } from "~/components/common/IconButton";
import { InputDate } from "~/components/common/InputDate";
import { InputGroup } from "~/components/common/InputGroup";
import { InputSelect } from "~/components/common/InputSelect";
import { InputText } from "~/components/common/InputText";
import { TextArea } from "~/components/common/TextArea";
import { MiniTaskRow } from "~/components/task/MiniTaskRow";
import { Modal } from "~/layouts/modal";
import { getTask } from "~/services/task/getTask";
import { updateTask } from "~/services/task/updateTask";
import { TaskPriority, TaskStatus, type Task } from "~/types/Models";
import { type UpdateTaskDto } from "~/types/task/update-task.dto";
import { CommentChain } from "../comment/CommentChain";
import { CustomerOptions } from "../customer/CustomerOptions";
import { UserOptions } from "../user/UserOptions";

interface TaskEditViewParams {
  handleClose: (update?: boolean) => void;
  taskId: number | undefined;
}

export const TaskEditView = ({ handleClose, taskId }: TaskEditViewParams) => {
  const [animRef] = useAutoAnimate({});
  const { register, setValue, getValues, watch } = useForm<UpdateTaskDto>();
  const [show, setShow] = useState<"project" | "chat">("project");
  const [task, setTask] = useState<Task>();

  const loadTask = async () => {
    if (!taskId) return;
    const task = await getTask({ id: taskId });
    if (!task) return;
    setTask(task);
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!task) return;
    const values = getValues();
    const dto: UpdateTaskDto = {
      ...values,
      assignedId: Number(values.assignedId),
      customerId: Number(values.customerId),
    };
    const updatedTask = await updateTask({ ...dto }, task.id);
    if (!updatedTask) {
      toast.error("Houve um erro ao alterar a solicitação");
      return;
    }
    toast.success("Solicitação alterada com sucesso!");
    handleClose(true);
  };

  const updateFormFields = () => {
    if (!task) return;
    const {
      targetDate,
      title,
      description,
      assignedId,
      customerId,
      status,
      priority,
    } = task;
    setValue("targetDate", targetDate ?? undefined);
    setValue("title", title ?? "");
    setValue("description", description ?? "");
    setValue("assignedId", assignedId);
    setValue("customerId", customerId);
    setValue("status", status);
    setValue("priority", priority);
  };

  const copyTaskUrl = async () => {
    await window.navigator.clipboard.writeText(
      `http://localhost:3000/app/task?task_id=${task?.id}`,
    );
    toast.success("URL copiada com sucesso!");
  };

  const togglePanel = () => {
    if (show === "chat") setShow("project");
    else setShow("chat");
  };

  const openProject = () => {
    window.open(
      `http://localhost:3000/app/project?project_id=${task?.projectId}`,
      "_blank",
    );
  };

  const dependantTasksDisplay = useMemo(() => {
    return task?.dependsOn?.map((dependancy) => (
      <>
        <MiniTaskRow
          onClick={() => {
            alert("");
          }}
          key={`dep-task-${dependancy.task.id}`}
          task={dependancy.task}
        />
        <Divider />
      </>
    ));
  }, [task?.dependsOn]);

  useEffect(() => {
    updateFormFields();
  }, [task]);

  useEffect(() => {
    void loadTask();
  }, [taskId]);

  return (
    <Modal onClick={handleClose}>
      <div ref={animRef} className="flex flex-row items-start gap-4">
        <div className="relative flex max-h-[90vh] min-w-[650px] flex-col gap-4 overflow-auto rounded-lg bg-white p-8">
          <div className="absolute left-0 top-0 flex items-center gap-2 rounded-br-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-1 font-bold tracking-tight text-white">
            <Icon icon={"fluent:clipboard-task-add-24-regular"} fontSize={31} />
            Solicitação
          </div>
          <div className="absolute right-0 top-0 flex items-center justify-end gap-2 bg-white px-4 py-2 font-bold tracking-tight text-gray-700">
            <div className="flex flex-row items-center gap-2">
              <IconButton
                icon="fluent:share-16-filled"
                onClick={copyTaskUrl}
                size={20}
                type="button"
              />

              <div className="relative flex flex-col items-center justify-center">
                <IconButton
                  icon="material-symbols:chat"
                  onClick={togglePanel}
                  size={20}
                  type="button"
                />
                <span className="absolute bottom-[-25%] left-[50%] z-[5] mt-[-5px] text-xs font-extrabold text-primary">
                  {task?.comments?.length}
                </span>
              </div>
            </div>
          </div>
          <form onSubmit={formSubmit} className="mt-8 flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-2 pb-4 text-2xl font-bold tracking-tight text-primary">
              #{taskId} {getValues("title")}
            </div>
            <div className="grid grid-cols-5 gap-4">
              <InputGroup label="Título" className="col-span-4">
                <InputText<UpdateTaskDto>
                  register={register}
                  paramName="title"
                  placeholder="Título"
                />
              </InputGroup>
              <InputGroup label="Projeto" className="h-full">
                <div className="relative h-full rounded-md border py-1 pl-4 pr-8 font-semibold text-gray-700">
                  📋 #{task?.projectId}
                  <Icon
                    icon="ion:open-outline"
                    onClick={openProject}
                    className="absolute right-[10px] top-[45%] translate-y-[-50%] cursor-pointer transition hover:text-primary"
                  />
                </div>
              </InputGroup>
            </div>
            <InputGroup label="Descrição">
              <TextArea<UpdateTaskDto>
                register={register}
                paramName="description"
                placeholder="Descrição"
                rows={8}
              />
            </InputGroup>
            <div className="grid grid-cols-2 gap-6 py-2">
              <InputGroup label="Cliente">
                <InputSelect<UpdateTaskDto>
                  register={register}
                  paramName="customerId"
                >
                  <option value={undefined}>Selecionar Cliente</option>
                  <CustomerOptions />
                </InputSelect>
              </InputGroup>
              <InputGroup label="Responsável">
                <InputSelect<UpdateTaskDto>
                  register={register}
                  paramName="assignedId"
                >
                  <option value={undefined}>Selecionar Responsável</option>
                  <UserOptions />
                </InputSelect>
              </InputGroup>
            </div>
            <div className="grid grid-cols-3 gap-6 py-2">
              <InputGroup label="Prioridade">
                <InputSelect<UpdateTaskDto>
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
              <InputGroup label="Estado">
                <InputSelect<UpdateTaskDto>
                  register={register}
                  paramName="status"
                >
                  <option value={undefined}>Selecionar Estado</option>
                  <option value={TaskStatus.DEFINE_DEADLINE}>
                    📆 Definir Prazo
                  </option>
                  <option value={TaskStatus.PENDING}>💤 Pendente</option>
                  <option value={TaskStatus.IN_PROGRESS}>
                    🔨 Em Progresso
                  </option>
                  <option value={TaskStatus.IN_CHANGE}>🚧 Em Alteração</option>
                  <option value={TaskStatus.IN_APPROVAL}>
                    🕵️‍♀️ Em Aprovação
                  </option>
                  <option value={TaskStatus.COMPLETED}>✅ Finalizada</option>
                  <option value={TaskStatus.CANCELLED}>❌ Cancelada</option>
                  <option value={TaskStatus.LOCKED}>🔒 Travada</option>
                </InputSelect>
              </InputGroup>
              <InputGroup label="Prazo">
                <InputDate<UpdateTaskDto>
                  setValue={setValue}
                  paramName="targetDate"
                  className="relative z-[199]"
                  watch={watch}
                />
              </InputGroup>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-gray-700">
                Depende de:
              </div>
              <div className="flex flex-col gap-1 rounded-lg border p-2">
                <div className="mb-2 flex flex-row gap-4 border-b text-start text-xs font-semibold text-gray-700">
                  <div className="basis-[10%]">Prazo</div>
                  <div className="basis-[5%]">-</div>
                  <div className="basis-[45%]">Título</div>
                  <div className="basis-[10%]">Cliente</div>
                  <div className="basis-[10%]">Responsável</div>
                  <div className="basis-[10%]">Criado Por</div>
                </div>
                {dependantTasksDisplay}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button>Salvar</Button>
              <Button layout="cancel" onClick={() => handleClose()}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>

        {show === "chat" && (
          <CommentChain
            togglePanel={togglePanel}
            comments={task?.comments}
            taskId={taskId}
          />
        )}
      </div>
    </Modal>
  );
};
