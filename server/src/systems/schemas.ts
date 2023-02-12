import { object, string } from "yup";

export const messageBodySchema = object({
  note: string()
    .required()
    .trim()
    .max(250, "note must not exceed 250 characters"),
}).required();

interface Task {
  note: string;
  date: Date;
}
export interface GetAllNotesInterface {
  doneTasks?: Task[];
  tasksToComplete?: Task[];
}
