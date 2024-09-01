import { isAxiosError } from "axios";
import { type Project } from "~/types/Models";
import { type CreateProjectDto } from "~/types/project/create-project.dto";
import fetchData from "~/utils/fetchData";

export const createProject = async (
  dto: CreateProjectDto,
): Promise<Project | undefined> => {
  const response = await fetchData<Project>({
    path: "/project",
    data: dto,
    method: "POST",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
