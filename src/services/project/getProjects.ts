/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { type Project, type TaskStatus } from "~/types/Models";
import fetchData from "~/utils/fetchData";

export interface GetProjectsParams {
  dateRange?: [Date, Date];
  userId?: number;
  customerId?: number;
  title?: string;
  pageSize: number;
  status?: TaskStatus;
  page: number;
  isDone?: boolean;
}

export const getProjects = async (
  params: GetProjectsParams,
): Promise<Project[] | undefined> => {
  const data: Record<string, any> = {
    ...params,
    status:
      params.status && params.status.length > 0 ? params.status : undefined,
    isDone: params.isDone === false ? undefined : params.isDone,
    dateFrom: params.dateRange ? params.dateRange[0] : undefined,
    dateTo: params.dateRange ? params.dateRange[1] : undefined,
  };

  for (const key of Object.keys(data)) {
    if (!data[key] || data[key].length == 0) data[key] = undefined;
  }

  const response = await fetchData<Project[]>({
    path: "/project",
    params: data,
    data: undefined,
    method: "GET",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
