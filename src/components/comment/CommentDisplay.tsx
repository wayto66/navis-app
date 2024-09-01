import Image from "next/image";
import React from "react";
import { type Comment, type User } from "~/types/Models";

interface CommentDisplayProps {
  comment: Comment;
  user: User | undefined;
}

export const CommentDisplay: React.FC<CommentDisplayProps> = ({
  comment,
  user,
}) => {
  return (
    <div className="mb-4 flex flex-row space-x-4 rounded-lg p-4">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex-shrink-0">
          {user?.image ? (
            <Image
              className="h-8 w-8 rounded-full object-cover"
              src={user?.image}
              alt={user?.name ?? "user"}
              width={32}
              height={32}
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
              <span className="text-gray-500">{user?.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
      </div>
      <div className="flex flex-col gap-1 rounded-lg px-4 py-2 shadow-md">
        <div className="">{comment.content}</div>

        <div className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};
