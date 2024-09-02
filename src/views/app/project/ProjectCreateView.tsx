import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import { type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/common/Button";
import { InputDate } from "~/components/common/InputDate";
import { InputGroup } from "~/components/common/InputGroup";
import { InputSelect } from "~/components/common/InputSelect";
import { InputText } from "~/components/common/InputText";
import { TextArea } from "~/components/common/TextArea";
import { Modal } from "~/layouts/modal";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { createProject } from "~/services/project/createProject";
import { TaskPriority } from "~/types/Models";
import { type CreateProjectDto } from "~/types/project/create-project.dto";
import { CustomerOptions } from "../customer/CustomerOptions";

interface ProjectCreateViewParams {
  handleClose: (update?: boolean) => void;
}

export const ProjectCreateView = ({ handleClose }: ProjectCreateViewParams) => {
  const { data: session } = useSession();
  const [animRef] = useAutoAnimate();

  const { register, setValue, getValues, watch } = useForm<CreateProjectDto>();

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session) return;
    const dto = getValues();

    dto.customerId = Number(dto.customerId);

    const project = await createProject({ ...dto, userId: session.user.id });
    if (!project?.id) {
      toast.error("Houve um erro ao criar a projeto");
      return;
    }
    toast.success("Projeto criado com sucesso!");
    handleClose(true);
  };

  return (
    <Modal onClick={handleClose}>
      <div
        className="animation-spin-y relative flex max-h-[90vh] min-w-[650px] flex-col gap-4 overflow-auto rounded-lg bg-white p-8"
        ref={animRef}
      >
        <div className="absolute left-0 top-0 flex items-center gap-2 rounded-br-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-1 font-bold tracking-tight text-white">
          <Icon icon={"eos-icons:project"} />
          Criar Projeto
        </div>
        <form onSubmit={formSubmit} className="mt-6 flex flex-col gap-2">
          <InputGroup label="Título">
            <InputText<CreateProjectDto>
              register={register}
              paramName="title"
              placeholder="Título"
              required
            />
          </InputGroup>
          <InputGroup label="Descrição">
            <TextArea<CreateProjectDto>
              register={register}
              paramName="description"
              placeholder="Descrição"
              required
              rows={8}
            />
          </InputGroup>

          <div className="grid grid-cols-3 gap-6 py-2">
            <InputGroup label="Cliente">
              <InputSelect<CreateProjectDto>
                register={register}
                paramName="customerId"
              >
                <option value={undefined}>Selecionar Cliente</option>
                <CustomerOptions />
              </InputSelect>
            </InputGroup>
            <InputGroup label="Prioridade">
              <InputSelect<CreateProjectDto>
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
              <InputDate<CreateProjectDto>
                setValue={setValue}
                paramName="targetDate"
                className="relative z-[199]"
                watch={watch}
              />
            </InputGroup>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button>✅ Criar</Button>
            <Button layout="cancel" onClick={() => handleClose()}>
              ❌ Cancelar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
