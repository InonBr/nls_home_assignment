export interface TaskActions {
  taskId: string;
  buttonName: "delete" | "markDone" | "unDone";
  done: boolean;
}
