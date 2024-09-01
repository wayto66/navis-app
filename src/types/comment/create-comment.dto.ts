export interface CreateCommentDto {
  taskId?: number;
  projectId?: number;
  userId: number;
  content: string;
}
