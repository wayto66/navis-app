import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/common/Button";
import { Divider } from "~/components/common/Divider";
import HoldButton from "~/components/common/HoldButton";
import { IconButton } from "~/components/common/IconButton";
import { InputDate } from "~/components/common/InputDate";
import { InputGroup } from "~/components/common/InputGroup";
import { InputSelect } from "~/components/common/InputSelect";
import { TextArea } from "~/components/common/TextArea";
import { MiniTaskRow } from "~/components/task/MiniTaskRow";
import { Modal } from "~/layouts/modal";
import { deleteProject } from "~/services/project/deleteProject";
import { getProject } from "~/services/project/getProject";
import { updateProject } from "~/services/project/updateProject";
import { TaskPriority, TaskStatus, type Project } from "~/types/Models";
import { type UpdateProjectDto } from "~/types/project/update-project.dto";
import awaitFor from "~/utils/awaitFor";
import { CommentChain } from "../comment/CommentChain";
import { CustomerOptions } from "../customer/CustomerOptions";
import { UserOptions } from "../user/UserOptions";

interface ProjectEditViewParams {
  handleClose: (update?: boolean) => void;
  projectId: number | undefined;
}

export const ProjectEditView = ({
  handleClose,
  projectId,
}: ProjectEditViewParams) => {
  const [animRef] = useAutoAnimate();
  const { register, setValue, getValues, watch } = useForm<UpdateProjectDto>();
  const [project, setProject] = useState<Project>();
  const [show, setShow] = useState<"project" | "chat">("project");

  const loadProject = async () => {
    if (!projectId) return;
    const project = await getProject({ id: projectId });
    if (!project) return;
    setProject(project);
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!project) return;
    const values = getValues();
    const dto: UpdateProjectDto = {
      ...values,
      userId: Number(values.userId),
    };
    const updatedProject = await updateProject({ ...dto }, project.id);
    if (!updatedProject) {
      toast.error("Houve um erro ao alterar a solicitação");
      return;
    }
    toast.success("Solicitação alterada com sucesso!");
    handleClose(true);
  };

  const updateFormFields = () => {
    if (!project) return;
    const {
      targetDate,
      title,
      description,
      userId,
      customerId,
      status,
      priority,
    } = project;
    setValue("targetDate", targetDate ?? undefined);
    setValue("title", title ?? "");
    setValue("description", description ?? "");
    setValue("userId", userId);
    setValue("customerId", customerId);
    setValue("status", status);
    setValue("priority", priority);
  };

  const copyProjectUrl = async () => {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    await window.navigator.clipboard.writeText(
      `${baseURL}/app/project?project_id=${project?.id}`,
    );
    toast.success("URL copiada com sucesso!");
  };

  const openTaskWindow = (taskId: number) => {
    const url = `/app/task?task_id=${taskId}`;
    window.open(url, "_blank");
  };

  const togglePanel = () => {
    if (show === "chat") setShow("project");
    else setShow("chat");
  };

  const handleDeleteProject = async () => {
    if (!project) return;
    const response = await deleteProject(project.id);
    if (!response?.id) {
      toast.error("Houve um erro ao excluir a rotina");
      return;
    }

    await awaitFor(false, 0.5);

    handleClose();
  };

  const dependantProjectsDisplay = useMemo(() => {
    return project?.tasks?.map((task) => (
      <>
        <MiniTaskRow
          onClick={() => openTaskWindow(task.id)}
          key={`dep-task-${task.id}-${Math.random()}`}
          task={task}
        />
        <Divider />
      </>
    ));
  }, [project?.tasks]);

  useEffect(() => {
    updateFormFields();
  }, [project]);

  useEffect(() => {
    void loadProject();
  }, [projectId]);

  return (
    <Modal onClick={handleClose} className="flex-col gap-8">
      <div className="flex flex-row items-start gap-4" ref={animRef}>
        <div
          className="relative flex max-h-[90vh] min-w-[650px] flex-col gap-4 overflow-auto rounded-lg bg-white p-8"
          ref={animRef}
        >
          <div className="absolute left-0 top-0 flex items-center gap-2 rounded-br-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-1 font-bold tracking-tight text-white">
            <Icon icon={"eos-icons:project"} />
            Projeto
          </div>
          <div className="absolute right-0 top-0 flex items-center justify-end gap-2 bg-white px-4 py-2 font-bold tracking-tight text-gray-700">
            <div className="flex flex-row items-center gap-2">
              <IconButton
                icon="fluent:share-16-filled"
                onClick={copyProjectUrl}
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
                  {project?.comments?.length}
                </span>
              </div>
            </div>
          </div>
          <form onSubmit={formSubmit}>
            <div className="mt-4 flex flex-row items-center justify-between gap-2 pb-4 text-2xl font-bold tracking-tight text-primary">
              <h1>
                #{projectId} {getValues("title")}
              </h1>
            </div>

            <InputGroup label="Descrição">
              <TextArea<UpdateProjectDto>
                register={register}
                paramName="description"
                placeholder="Descrição"
                rows={8}
              />
            </InputGroup>
            <div className="grid grid-cols-2 gap-6 py-2">
              <InputGroup label="Cliente">
                <InputSelect<UpdateProjectDto>
                  register={register}
                  paramName="customerId"
                >
                  <option value={undefined}>Selecionar Cliente</option>
                  <CustomerOptions />
                </InputSelect>
              </InputGroup>
              <InputGroup label="Criador">
                <InputSelect<UpdateProjectDto>
                  register={register}
                  paramName="userId"
                  disabled={true}
                >
                  <option value={undefined}>-</option>
                  <UserOptions />
                </InputSelect>
              </InputGroup>
            </div>
            <div className="grid grid-cols-3 gap-6 py-2">
              <InputGroup label="Prioridade">
                <InputSelect<UpdateProjectDto>
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
                <InputSelect<UpdateProjectDto>
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
                <InputDate<UpdateProjectDto>
                  setValue={setValue}
                  paramName="targetDate"
                  className="relative z-[199]"
                  watch={watch}
                />
              </InputGroup>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-gray-700">
                Tarefas:
              </div>
              <div className="flex flex-col gap-1 rounded-lg border p-2">
                <div className="mb-2 flex flex-row gap-4 border-b text-start text-xs font-semibold text-gray-700">
                  <div className="flex basis-[10%]">Prazo</div>
                  <div className="flex basis-[5%]">-</div>
                  <div className="flex basis-[45%]">Título</div>
                  <div className="flex basis-[10%]">Cliente</div>
                  <div className="flex basis-[10%]">Responsável</div>
                  <div className="flex basis-[10%]">Criado Por</div>
                </div>
                {dependantProjectsDisplay}
              </div>
            </div>


            <div className="grid grid-cols-7 gap-4 pt-4">
              <Button className="col-span-3">✅ Salvar</Button>
              <Button
                className="col-span-3"
                layout="cancel"
                onClick={() => handleClose()}
              >
                ❌ Cancelar
              </Button>
              <HoldButton
                type="button"
                completedText={"👍"}
                className="flex flex-col items-center justify-center"
                holdTime={2000}
                onClick={handleDeleteProject}
              >
                <span>🗑</span>
                <span className="text-xs tracking-tight text-white">
                  Excluir
                </span>
              </HoldButton>
            </div>
          </form>
        </div>

        {show === "chat" && (
          <CommentChain
            togglePanel={togglePanel}
            comments={project?.comments}
            projectId={projectId}
          />
        )}
      </div>
    </Modal>
  );
};
