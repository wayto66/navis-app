import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import { type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/common/Button";
import { InputGroup } from "~/components/common/InputGroup";
import { InputSelect } from "~/components/common/InputSelect";
import { InputText } from "~/components/common/InputText";
import { TextArea } from "~/components/common/TextArea";
import { Modal } from "~/layouts/modal";
import { createRoutine } from "~/services/routine/createRoutine";
import { RoutineMode } from "~/types/Models";
import { type CreateRoutineDto } from "~/types/routine/create-routine.dto";
import { CustomerOptions } from "../customer/CustomerOptions";
import { UserOptions } from "../user/UserOptions";
import { RoutineCreateInputs } from "./RoutineCreateInputs";

interface RoutineCreateViewParams {
  handleClose: (update?: boolean) => void;
}

interface SearchParams {
  searchTerm: string;
}

export const RoutineCreateView = ({ handleClose }: RoutineCreateViewParams) => {
  // refs
  const [parent] = useAutoAnimate();
  // end refs
  const { data: session } = useSession();
  const { register, setValue, getValues, watch } = useForm<CreateRoutineDto>();

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session) return;
    const values = getValues();
    const dto: CreateRoutineDto = {
      ...values,
      assignedId: Number(values.assignedId),
      customerId: Number(values.customerId),
    };

    const routine = await createRoutine({ ...dto, creatorId: session.user.id });
    if (!routine?.id) {
      toast.error("Houve um erro ao criar a rotina");
      return;
    }
    toast.success("Rotina criada com sucesso!");
    handleClose(true);
  };

  return (
    <Modal onClick={handleClose}>
      <div className="animation-spin-y relative flex max-h-[90vh] min-w-[650px] flex-col gap-4 overflow-auto rounded-lg bg-white p-8">
        <div className="absolute left-0 top-0 flex items-center gap-4 rounded-br-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-1 font-bold tracking-tight text-white">
          <Icon icon={"akar-icons:schedule"} fontSize={20} />
          <span>Criar Rotina</span>
        </div>
        <form onSubmit={formSubmit} className="mt-8 flex flex-col gap-2">
          <InputGroup label="Título">
            <InputText<CreateRoutineDto>
              register={register}
              paramName="title"
              placeholder="Título"
            />
          </InputGroup>

          <InputGroup label="Descrição">
            <TextArea<CreateRoutineDto>
              register={register}
              paramName="description"
              placeholder="Descrição"
              rows={6}
            />
          </InputGroup>
          <div className="grid grid-cols-3 gap-6 py-2">
            <InputGroup label="Cliente">
              <InputSelect<CreateRoutineDto>
                register={register}
                paramName="customerId"
              >
                <option value={undefined}>Selecionar Cliente</option>
                <CustomerOptions />
              </InputSelect>
            </InputGroup>
            <InputGroup label="Responsável">
              <InputSelect<CreateRoutineDto>
                register={register}
                paramName="assignedId"
              >
                <option value={undefined}>Selecionar Responsável</option>
                <UserOptions />
              </InputSelect>
            </InputGroup>
            <InputGroup label="Modo">
              <InputSelect<CreateRoutineDto>
                register={register}
                paramName="mode"
              >
                <option value={undefined}>Selecionar Modo</option>
                <option value={RoutineMode.DAY_COUNT}>📅 Cada X Dias</option>
                <option value={RoutineMode.WEEKLY}>📅 Semanalmente</option>
                <option value={RoutineMode.MONTHLY}>📅 Mensalmente</option>
                <option value={RoutineMode.MONTH_COUNT}>📅 Cada X Meses</option>
              </InputSelect>
            </InputGroup>
          </div>
          <RoutineCreateInputs
            mode={watch("mode")}
            props={{ register, setValue, watch }}
          />
          <div className="grid grid-cols-2 gap-6 py-2"></div>

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
