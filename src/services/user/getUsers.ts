import { isAxiosError } from "axios";
import { type User } from "~/types/Models";
import { type ServerResponse } from "~/types/ServerResponse";
import fetchData from "~/utils/fetchData";

interface GetUsersParams {
  page: number;
  pageSize: number;
}

export const getUsers = async ({
  page,
  pageSize,
}: GetUsersParams): Promise<User[] | undefined> => {
  const response = await fetchData<ServerResponse<User>>({
    path: "/user",
    params: {
      page,
      pageSize,
    },
    data: undefined,
    method: "GET",
  });

  if (isAxiosError(response) || !response) return undefined;

  return response.items;
};
