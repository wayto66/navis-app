/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import { type Routine } from "~/types/Models";
import fetchData from "~/utils/fetchData";

export interface GetRoutinesParams {
  dateRange?: [Date, Date];
  creatorId?: number;
  assignedId?: number;
  customerId?: number;
  title?: string;
  pageSize: number;
  page: number;
}

export const getRoutines = async (
  params: GetRoutinesParams,
): Promise<Routine[] | undefined> => {
  const data: Record<string, any> = {
    ...params,
    dateFrom: params.dateRange ? params.dateRange[0] : undefined,
    dateTo: params.dateRange ? params.dateRange[1] : undefined,
  };

  for (const key of Object.keys(data)) {
    if (!data[key] || data[key].length == 0) data[key] = undefined;
  }

  const response = await fetchData<Routine[]>({
    path: "/routine",
    params: data,
    data: undefined,
    method: "GET",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
