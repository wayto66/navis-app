/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { type Task } from "~/types/Models";
import fetchData from "~/utils/fetchData";

export interface GetTaskParams {
  id: number;
}

export const getTask = async ({
  id,
}: GetTaskParams): Promise<Task | undefined> => {
  const response = await fetchData<Task>({
    path: `/task/${id}`,
    data: undefined,
    method: "GET",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
