import { object, string } from "yup";

export const noteBodySchema = object({
  note: string()
    .required()
    .trim()
    .max(250, "note must not exceed 250 characters"),
}).required();

export const noteParamsId = string().required();

interface Task {
  id: string;
  note: string;
  date: Date;
}
export interface GetAllNotesInterface {
  doneTasks?: Task[];
  tasksToComplete?: Task[];
}
