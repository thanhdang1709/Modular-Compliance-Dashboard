// src/API.ts

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  dueDate?: string | null;
  assignedPerson?: string | null;
  status: TaskStatus;
}

export interface CreateTaskInput {
  title: string;
  description?: string | null;
  dueDate?: string | null;
  assignedPerson?: string | null;
  status: TaskStatus;
}

export interface UpdateTaskInput {
  id: string;
  title?: string | null;
  description?: string | null;
  dueDate?: string | null;
  assignedPerson?: string | null;
  status?: TaskStatus | null;
}

export interface DeleteTaskInput {
  id: string;
}

export interface ListTasksQuery {
  listTasks?: {
    items: Task[];
  } | null;
}

export interface CreateTaskMutation {
  createTask?: Task | null;
}

export interface UpdateTaskMutation {
  updateTask?: Task | null;
}

export interface DeleteTaskMutation {
  deleteTask?: {
    id: string;
  } | null;
}