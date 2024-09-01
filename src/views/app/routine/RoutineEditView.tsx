import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/common/Button";
import HoldButton from "~/components/common/HoldButton";
import { IconButton } from "~/components/common/IconButton";
import { InputDate } from "~/components/common/InputDate";
import { InputGroup } from "~/components/common/InputGroup";
import { InputSelect } from "~/components/common/InputSelect";
import { InputText } from "~/components/common/InputText";
import { TextArea } from "~/components/common/TextArea";
import { Modal } from "~/layouts/modal";
import { checkRoutine } from "~/services/routine/checkRoutine";
import { getRoutine } from "~/services/routine/getRoutine";
import { updateRoutine } from "~/services/routine/updateRoutine";
import { RoutineMode, type Routine } from "~/types/Models";
import { type CreateRoutineDto } from "~/types/routine/create-routine.dto";
import { type UpdateRoutineDto } from "~/types/routine/update-routine.dto";
import awaitFor from "~/utils/awaitFor";
import { CommentChain } from "../comment/CommentChain";
import { CustomerOptions } from "../customer/CustomerOptions";
import { UserOptions } from "../user/UserOptions";

interface RoutineEditViewParams {
  handleClose: (update?: boolean) => void;
  routineId: number | undefined;
}

export const RoutineEditView = ({
  handleClose,
  routineId,
}: RoutineEditViewParams) => {
  const [animRef] = useAutoAnimate();
  const { register, setValue, getValues, watch } = useForm<UpdateRoutineDto>();
  const [show, setShow] = useState<"project" | "chat">("project");
  const [routine, setRoutine] = useState<Routine>();

  const loadRoutine = async () => {
    if (!routineId) return;
    const routine = await getRoutine({ id: routineId });
    if (!routine) return;
    setRoutine(routine);
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!routine) return;
    const values = getValues();
    const dto: UpdateRoutineDto = {
      ...values,
      assignedId: Number(values.assignedId),
      customerId: Number(values.customerId),
    };
    const updatedRoutine = await updateRoutine({ ...dto }, routine.id);
    if (!updatedRoutine) {
      toast.error("Houve um erro ao alterar a solicitação");
      return;
    }
    toast.success("Solicitação alterada com sucesso!");
    handleClose(true);
  };

  const updateFormFields = () => {
    if (!routine) return;
    const { targetDate, title, description, assignedId, customerId, mode } =
      routine;
    setValue("targetDate", targetDate ?? undefined);
    setValue("title", title ?? "");
    setValue("description", description ?? "");
    setValue("assignedId", assignedId);
    setValue("customerId", customerId);
    setValue("mode", mode);
  };

  const copyRoutineUrl = async () => {
    await window.navigator.clipboard.writeText(
      `http://localhost:3000/app/routine?routine_id=${routine?.id}`,
    );
    toast.success("URL copiada com sucesso!");
  };

  const togglePanel = () => {
    if (show === "chat") setShow("project");
    else setShow("chat");
  };

  const handleCheck = async () => {
    if (!routine) return;
    const response = await checkRoutine({ id: routine.id });
    if (!response?.id) {
      toast.error("Houve um erro ao finalizar a rotina");
      return;
    }

    await awaitFor(false, 1);

    handleClose();
  };

  useEffect(() => {
    updateFormFields();
  }, [routine]);

  useEffect(() => {
    void loadRoutine();
  }, [routineId]);

  return (
    <Modal onClick={handleClose}>
      {show === "project" && (
        <div
          ref={animRef}
          className="animation-spin-y relative flex max-h-[90vh] min-w-[650px] flex-col gap-4 overflow-auto rounded-lg bg-white p-8"
        >
          <div className="absolute left-0 top-0 flex items-center gap-2 rounded-br-lg bg-gradient-to-r from-primary to-primary/80 px-8 py-1 font-bold tracking-tight text-white">
            <Icon icon={"akar-icons:schedule"} fontSize={20} />
            Rotina
          </div>
          <div className="absolute right-0 top-0 flex items-center justify-end gap-2 bg-white px-4 py-2 font-bold tracking-tight text-gray-700">
            <div className="flex flex-row items-center gap-2">
              <IconButton
                icon="fluent:share-16-filled"
                onClick={copyRoutineUrl}
                size={20}
                type="button"
              />

              {/* <div className="relative flex flex-col items-center justify-center">
                <IconButton
                  icon="material-symbols:chat"
                  onClick={togglePanel}
                  size={20}
                  type="button"
                />
                <span className="absolute bottom-[-25%] left-[50%] z-[5] mt-[-5px] text-xs font-extrabold text-primary">
                  {routine?.comments?.length}
                </span>
              </div> */}
            </div>
          </div>
          <form onSubmit={formSubmit} className="mt-8 flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-2 pb-4 text-2xl font-bold tracking-tight text-primary">
              #{routineId} {getValues("title")}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <InputGroup label="Título" className="col-span-2">
                <InputText<UpdateRoutineDto>
                  register={register}
                  paramName="title"
                  placeholder="Título"
                  disabled
                />
              </InputGroup>
              <InputGroup label="Cliente">
                <InputSelect<UpdateRoutineDto>
                  register={register}
                  paramName="customerId"
                  disabled
                >
                  <option value={undefined}>Selecionar Cliente</option>
                  <CustomerOptions />
                </InputSelect>
              </InputGroup>
            </div>
            <InputGroup label="Descrição">
              <TextArea<UpdateRoutineDto>
                register={register}
                paramName="description"
                placeholder="Descrição"
                rows={8}
                disabled
              />
            </InputGroup>
            <div className="grid grid-cols-3 gap-6 py-2">
              <InputGroup label="Responsável">
                <InputSelect<UpdateRoutineDto>
                  register={register}
                  paramName="assignedId"
                  disabled
                >
                  <option value={undefined}>Selecionar Responsável</option>
                  <UserOptions />
                </InputSelect>
              </InputGroup>
              <InputGroup label="Modo">
                <InputSelect<CreateRoutineDto>
                  register={register}
                  paramName="mode"
                  disabled
                >
                  <option value={undefined}>Selecionar Modo</option>
                  <option value={RoutineMode.DAY_COUNT}>📅 Cada X Dias</option>
                  <option value={RoutineMode.WEEKLY}>📅 Semanalmente</option>
                  <option value={RoutineMode.MONTHLY}>📅 Mensalmente</option>
                  <option value={RoutineMode.MONTH_COUNT}>
                    📅 Cada X Meses
                  </option>
                </InputSelect>
              </InputGroup>{" "}
              <InputGroup label="Próxima Data">
                <InputDate<UpdateRoutineDto>
                  setValue={setValue}
                  paramName="targetDate"
                  className="relative z-[199]"
                  watch={watch}
                  disabled
                />
              </InputGroup>
            </div>

            <div className="grid grid-cols-7 gap-4 pt-4">
              <HoldButton
                type="button"
                completedText={"👍"}
                className="col-span-3 text-xs"
                onClick={handleCheck}
              >
                ✅ Marcar como Feita
              </HoldButton>
              <Button
                layout="cancel"
                className="col-span-3"
                onClick={() => handleClose()}
              >
                Cancelar
              </Button>
              <HoldButton
                type="button"
                completedText={"👍"}
                className="flex flex-col items-center justify-center"
                holdTime={2000}
              >
                <span>🗑</span>
                <span className="text-xs tracking-tight text-white">
                  Excluir
                </span>
              </HoldButton>
            </div>
          </form>
        </div>
      )}
      {show === "chat" && (
        <CommentChain
          togglePanel={togglePanel}
          comments={routine?.comments}
          routineId={routineId}
        />
      )}
    </Modal>
  );
};
