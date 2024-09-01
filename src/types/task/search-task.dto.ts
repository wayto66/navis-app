import { type TaskPriority, type TaskStatus } from "../Models";

export interface SearchTaskDto {
  id?: number;
  title?: string;
  userId?: number;
  customerId?: number;
  priority?: TaskPriority;
  status?: TaskStatus;
  dateFrom?: Date;
  dateTo?: Date;
}
