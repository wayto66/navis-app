import { isAxiosError } from "axios";
import { type Project } from "~/types/Models";
import { type UpdateProjectDto } from "~/types/project/update-project.dto";
import fetchData from "~/utils/fetchData";

export const updateProject = async (
  dto: UpdateProjectDto,
  id: number,
): Promise<Project | undefined> => {
  const response = await fetchData<Project>({
    path: `/project/${id}`,
    data: dto,
    method: "PATCH",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
