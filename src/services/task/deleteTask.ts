import { isAxiosError } from "axios";
import { type Task } from "~/types/Models";
import fetchData from "~/utils/fetchData";

export const deleteTask = async (id: number): Promise<Task | undefined> => {
  const response = await fetchData<Task>({
    path: `/task/${id}`,
    data: null,
    method: "DELETE",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
