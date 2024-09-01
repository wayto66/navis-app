/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { type Routine } from "~/types/Models";
import fetchData from "~/utils/fetchData";

export interface GetRoutineParams {
  id: number;
}

export const getRoutine = async ({
  id,
}: GetRoutineParams): Promise<Routine | undefined> => {
  const response = await fetchData<Routine>({
    path: `/routine/${id}`,
    data: undefined,
    method: "GET",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
