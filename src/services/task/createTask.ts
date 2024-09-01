import { isAxiosError } from "axios";
import { type Task } from "~/types/Models";
import { type CreateTaskDto } from "~/types/task/create-task.dto";
import fetchData from "~/utils/fetchData";

export const createTask = async (
  dto: CreateTaskDto,
): Promise<Task | undefined> => {
  const fixedDto: CreateTaskDto = {
    ...dto,
    dependsOnIds: [...new Set(dto.dependsOnIds)],
  };

  const response = await fetchData<Task>({
    path: "/task",
    data: fixedDto,
    method: "POST",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
