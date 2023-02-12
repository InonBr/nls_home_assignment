import { GetAllNotesInterface, messageBodySchema } from "@systems/schemas";
import { Request, Response, Router } from "express";
import { createNewNote, getAllNotes } from "repositories/notes";
import { ValidationError } from "yup";

const notesRouter = Router();

notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const msgBody = messageBodySchema.validateSync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { note } = msgBody;

    const { date, id, doneTask } = await createNewNote(note);

    res.send({ id, note, date, doneTask });
  } catch (err) {
    console.error(err);

    if (err instanceof ValidationError) {
      return res.status(400).json({ errors: err.errors });
    }

    const error = err as Error;
    return res.status(500).json({ msg: error.message });
  }
});

notesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const notes = await getAllNotes();

    const notesObj = notes.reduce((obj: GetAllNotesInterface, noteData) => {
      const key = noteData.doneTask ? "doneTasks" : "tasksToComplete";

      if (!obj[key]) {
        obj[key] = [];
      }

      obj[key]?.push({ date: noteData.date, note: noteData.note });

      return obj;
    }, {});

    res.send(notesObj);
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ msg: err.message });
  }
});

export default notesRouter;
