import { type RoutineMode } from "../Models";

export interface CreateRoutineDto {
  title: string;
  description: string;
  mode: RoutineMode;
  dayCount?: number;
  weekDays?: number[];
  monthDays?: number[];
  yearDay?: number;
  yearMonth?: number;
  monthCount?: number;
  creatorId: number;
  assignedId: number;
  customerId: number;
  lastSolved?: Date;
  targetDate?: Date;
}
