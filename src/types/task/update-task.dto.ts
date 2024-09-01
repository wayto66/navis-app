import { type TaskStatus } from "../Models";
import { type CreateTaskDto } from "./create-task.dto";

export interface UpdateTaskDto extends CreateTaskDto {
  status?: TaskStatus;
}
