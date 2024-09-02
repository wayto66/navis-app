import { isAxiosError } from "axios";
import { type Routine } from "~/types/Models";
import fetchData from "~/utils/fetchData";

export const deleteRoutine = async (
  id: number,
): Promise<Routine | undefined> => {
  const response = await fetchData<Routine>({
    path: `/routine/${id}`,
    data: null,
    method: "DELETE",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
