/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { type Routine } from "~/types/Models";
import fetchData from "~/utils/fetchData";

export interface CheckRoutineParams {
  id: number;
}

export const checkRoutine = async ({
  id,
}: CheckRoutineParams): Promise<Routine | undefined> => {
  const response = await fetchData<Routine>({
    path: `/routine/check/${id}`,
    data: undefined,
    method: "PATCH",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
