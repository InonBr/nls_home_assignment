import {
  GetAllNotesInterface,
  noteBodySchema,
  noteParamsId,
} from "@systems/schemas";
import { Request, Response, Router } from "express";
import {
  createNewNote,
  deleteNoteById,
  findNoteById,
  getAllNotes,
  updateNoteStatus,
} from "repositories/notes";
import { ValidationError } from "yup";

const notesRouter = Router();

notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const msgBody = noteBodySchema.validateSync(req.body, {
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

      obj[key]?.push({
        id: noteData.id,
        note: noteData.note,
        date: noteData.date,
        doneTask: noteData.doneTask,
      });

      return obj;
    }, {});

    res.send(notesObj);
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ msg: err.message });
  }
});

notesRouter.put("/:noteId", async (req: Request, res: Response) => {
  try {
    const noteId = await noteParamsId.validate(req.params.noteId, {
      abortEarly: false,
      stripUnknown: true,
    });

    const note = await findNoteById(noteId);

    if (!note) {
      return res.status(404).json({ errors: "note not found!" });
    }

    await updateNoteStatus({
      noteId,
      noteCurrentStatus: note.doneTask,
    });

    res.send({
      id: noteId,
      note: note.note,
      date: note.date,
      doneTask: !note.doneTask,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ errors: err.errors });
    }

    const error = err as Error;
    return res.status(500).json({ msg: error.message });
  }
});

notesRouter.delete("/:noteId", async (req: Request, res: Response) => {
  try {
    const noteId = await noteParamsId.validate(req.params.noteId, {
      abortEarly: false,
      stripUnknown: true,
    });

    await deleteNoteById(noteId);

    res.send(noteId);
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ errors: err.errors });
    }

    const error = err as Error;
    return res.status(500).json({ msg: error.message });
  }
});

export default notesRouter;
