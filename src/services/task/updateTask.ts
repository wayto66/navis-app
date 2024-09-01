import { isAxiosError } from "axios";
import { type Task } from "~/types/Models";
import { type UpdateTaskDto } from "~/types/task/update-task.dto";
import fetchData from "~/utils/fetchData";

export const updateTask = async (
  dto: UpdateTaskDto,
  id: number,
): Promise<Task | undefined> => {
  const response = await fetchData<Task>({
    path: `/task/${id}`,
    data: dto,
    method: "PATCH",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
