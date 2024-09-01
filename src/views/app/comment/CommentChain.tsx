import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CommentDisplay } from "~/components/comment/CommentDisplay";
import { Button } from "~/components/common/Button";
import { TextArea } from "~/components/common/TextArea";
import { reactContext } from "~/context";
import { createComment } from "~/services/comment/createComment";
import { type CreateCommentDto } from "~/types/comment/create-comment.dto";
import { type Comment } from "~/types/Models";

interface CommentChainParams {
  comments: Comment[] | undefined;
  togglePanel: () => void;
  projectId?: number;
  taskId?: number;
  routineId?: number;
}

export const CommentChain = ({
  comments: input_comments,
  togglePanel,
  taskId,
  projectId,
  routineId,
}: CommentChainParams) => {
  const ctx = useContext(reactContext);
  const [animRef] = useAutoAnimate();
  const { data: session } = useSession();
  const { register, getValues, setValue, resetField } =
    useForm<CreateCommentDto>();
  const { users } = ctx.data;
  const [comments, setComments] = useState<Comment[]>([]);

  const postComment = async () => {
    if (!session) return;
    const content = getValues("content");
    const dto: CreateCommentDto = {
      content,
      userId: session.user.id,
      projectId,
      taskId,
    };

    const comment = await createComment(dto);
    if (!comment?.id) {
      toast.error("Houve um erro ao postar o comentário.");
      return;
    }

    setComments((prev) => [...prev, comment]);
    resetField("content");
  };

  const commentList = useMemo(() => {
    return comments
      ?.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .map((comment) => {
        const user = users.find((usr) => usr.id === comment.userId);
        return (
          <CommentDisplay
            comment={comment}
            user={user}
            key={`comment-${comment.id}`}
          />
        );
      });
  }, [comments]);

  useEffect(() => {
    if (input_comments) setComments(input_comments);
  }, [input_comments]);

  return (
    <div className="relative flex max-h-[90vh] min-w-[650px] flex-col gap-4">
      <div className="relative flex flex-col gap-2 overflow-hidden rounded-lg bg-white p-6">
        <div className="absolute right-0 top-0 flex cursor-pointer items-center justify-end gap-2 rounded-bl-lg bg-white p-2 font-bold tracking-tight text-gray-700 shadow-xl transition hover:bg-red-400 hover:text-white">
          <Icon
            icon="material-symbols:close"
            onClick={togglePanel}
            fontSize={20}
            className=""
          />
        </div>
        <div
          className="flex max-h-[60vh] flex-col gap-2 overflow-auto"
          ref={animRef}
        >
          {" "}
          {commentList}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-4 rounded-lg bg-white p-6">
        <TextArea
          paramName="content"
          register={register}
          placeholder="Comentar..."
          className="flex grow"
        />
        <Button className="ml-auto h-full w-min" onClick={postComment}>
          <Icon icon={"mingcute:send-fill"} />
        </Button>
      </div>
    </div>
  );
};
