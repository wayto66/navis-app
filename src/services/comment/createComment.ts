import { isAxiosError } from "axios";
import { type CreateCommentDto } from "~/types/comment/create-comment.dto";
import { type Comment } from "~/types/Models";

import fetchData from "~/utils/fetchData";

export const createComment = async (
  dto: CreateCommentDto,
): Promise<Comment | undefined> => {
  const response = await fetchData<Comment>({
    path: "/comment",
    data: dto,
    method: "POST",
  });
  if (isAxiosError(response) || !response) return undefined;

  return response;
};
