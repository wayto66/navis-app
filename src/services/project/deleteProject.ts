import { isAxiosError } from "axios";
import { type Project } from "~/types/Models";
import fetchData from "~/utils/fetchData";

export const deleteProject = async (
  id: number,
): Promise<Project | undefined> => {
  const response = await fetchData<Project>({
    path: `/project/${id}`,
    data: null,
    method: "DELETE",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
