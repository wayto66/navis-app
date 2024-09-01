import { isAxiosError } from "axios";
import { type Routine } from "~/types/Models";
import { type UpdateRoutineDto } from "~/types/routine/update-routine.dto";
import fetchData from "~/utils/fetchData";

export const updateRoutine = async (
  dto: UpdateRoutineDto,
  id: number,
): Promise<Routine | undefined> => {
  const response = await fetchData<Routine>({
    path: `/routine/${id}`,
    data: dto,
    method: "PATCH",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
