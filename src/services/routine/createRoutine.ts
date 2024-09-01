import { isAxiosError } from "axios";
import { type Routine } from "~/types/Models";
import { type CreateRoutineDto } from "~/types/routine/create-routine.dto";
import fetchData from "~/utils/fetchData";

export const createRoutine = async (
  dto: CreateRoutineDto,
): Promise<Routine | undefined> => {
  const fixedDto: CreateRoutineDto = {
    ...dto,
    dayCount: dto.dayCount ? Number(dto.dayCount) : undefined,
    monthCount: dto.monthCount ? Number(dto.monthCount) : undefined,
  };

  console.log({ dto });

  const response = await fetchData<Routine>({
    path: "/routine",
    data: fixedDto,
    method: "POST",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
