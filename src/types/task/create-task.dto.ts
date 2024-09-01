import { type TaskPriority } from "../Models";

export interface CreateTaskDto {
  title: string;
  description: string;
  priority: TaskPriority;
  targetDate?: Date;
  creatorId: number;
  assignedId: number;
  customerId: number;
  projectId?: number;
  createProject?: boolean;
  dependsOnIds?: number[];
}
