export interface Task {
  id: string;
  text: string;
  done: boolean;
}

export type TaskFilter = "active" | "completed";
