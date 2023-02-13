import { GetAllNotesInterface } from "./apiInterfaces";
import { baseUrl } from "./urls";
import axios from "axios";

export const getAllNotes = async (): Promise<GetAllNotesInterface> =>
  await (
    await axios.get(`${baseUrl}`)
  ).data;
