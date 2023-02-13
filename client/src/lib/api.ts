import { GetAllNotesInterface, Task } from "./apiInterfaces";
import { baseUrl } from "./urls";
import axios from "axios";

export const getAllNotes = async (): Promise<GetAllNotesInterface> =>
  await (
    await axios.get(`${baseUrl}`)
  ).data;

export const createNewNote = async (noteText: string): Promise<Task> =>
  await (
    await axios.post(`${baseUrl}`, {
      note: noteText,
    })
  ).data;

export const deleteNote = async (noteId: string): Promise<string> =>
  await (
    await axios.delete(`${baseUrl}${noteId}`)
  ).data;

export const updateNoteStatus = async (noteId: string): Promise<Task> =>
  await (
    await axios.put(`${baseUrl}${noteId}`)
  ).data;
