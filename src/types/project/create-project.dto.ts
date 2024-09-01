import { type TaskPriority } from "../Models";

export interface CreateProjectDto {
  title: string;
  description: string;
  priority: TaskPriority;
  targetDate?: Date;
  userId: number;
  customerId: number;
}
