/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { type Project } from "~/types/Models";
import fetchData from "~/utils/fetchData";

export interface GetProjectParams {
  id: number;
}

export const getProject = async ({
  id,
}: GetProjectParams): Promise<Project | undefined> => {
  const response = await fetchData<Project>({
    path: `/project/${id}`,
    data: undefined,
    method: "GET",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
