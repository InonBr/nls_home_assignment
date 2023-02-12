import { object, string } from "yup";

export const messageBodySchema = object({
  note: string()
    .required()
    .trim()
    .max(250, "note must not exceed 250 characters"),
}).required();
