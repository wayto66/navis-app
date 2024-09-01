import { type TaskPriority, type TaskStatus } from "../Models";

export interface SearchProjectDto {
  id?: number;
  title?: string;
  isDone?: boolean;
  userId?: number;
  customerId?: number;
  priority?: TaskPriority;
  status?: TaskStatus;
  dateFrom?: Date;
  dateTo?: Date;
  page: number;
  pageSize: number;
}
