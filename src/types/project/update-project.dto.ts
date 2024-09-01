import { type TaskStatus } from "../Models";
import { type CreateProjectDto } from "./create-project.dto";

export interface UpdateProjectDto extends CreateProjectDto {
  isDone?: boolean;
  status?: TaskStatus;
}
