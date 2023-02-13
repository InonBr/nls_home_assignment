export interface TaskActions {
  taskId: string;
  buttonName: "delete" | "changeStatus";
  done: boolean;
}

export interface TaskUpdateInterface {
  id: string;
  note: string;
  date: Date;
  updateTo: boolean;
  updateFrom: boolean;
}
