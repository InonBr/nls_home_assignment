export interface Task {
  id: string;
  note: string;
  date: Date;
  doneTask: boolean;
}
export interface GetAllNotesInterface {
  doneTasks: Task[];
  tasksToComplete: Task[];
}
