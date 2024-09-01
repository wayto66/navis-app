// enums
export enum RoutineMode {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  MONTH_COUNT = "MONTH_COUNT",
  DAY_COUNT = "DAY_COUNT",
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum TaskStatus {
  PENDING = "PENDING",
  DEFINE_DEADLINE = "DEFINE_DEADLINE",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  IN_CHANGE = "IN_CHANGE",
  IN_APPROVAL = "IN_APPROVAL",
  CANCELLED = "CANCELLED",
  LOCKED = "LOCKED",
}

export enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

// interfaces
export interface User {
  id: number;
  phone: string;
  username: string;
  password: string;
  name: string;
  image?: string | null;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdTasks: Task[];
  assignedTasks: Task[];
  comments: Comment[];
  projects: Project[];
  createdRoutines: Routine[];
  assignedRoutines: Routine[];
  notes: Note[];
}

export interface Customer {
  id: number;
  name: string;
  image?: string | null;
  phone?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  tasks: Task[];
  projects: Project[];
  routines: Routine[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
  comments: Comment[];
  targetDate?: Date | null;
  isActive: boolean;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: TaskStatus;
  priority: TaskPriority;
  customerId: number;
  customer: Customer;
  userId: number;
  user: User;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  isActive: boolean;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
  targetDate?: Date | null;
  customerId: number;
  customer: Customer;
  creatorId: number;
  creator: User;
  assignedId: number;
  assigned: User;
  comments: Comment[];
  dependencies: TaskDependency[];
  dependsOn: TaskDependency[];
  projectId: number;
  project: Project;
}

export interface Comment {
  id: number;
  content: string;
  taskId?: number | null;
  task?: Task | null;
  projectId?: number | null;
  project?: Project | null;
  userId?: number | null;
  user?: User | null;
  routineId?: number | null;
  routine?: Routine | null;
  createdAt: Date;
}

export interface Routine {
  id: number;
  title: string;
  description: string;
  mode: RoutineMode;
  dayCount?: number | null;
  weekDays: number[];
  monthDays: number[];
  yearDay?: number | null;
  yearMonth?: number | null;
  monthCount?: number | null;
  creatorId: number;
  creator: User;
  assignedId: number;
  assigned: User;
  customerId: number;
  customer: Customer;
  comments: Comment[];
  lastSolved?: Date | null;
  targetDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  targetDate?: Date | null;
  userId: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskDependency {
  id: number;
  taskId: number;
  dependsOnId: number;
  task: Task;
  dependsOn: Task;
}
