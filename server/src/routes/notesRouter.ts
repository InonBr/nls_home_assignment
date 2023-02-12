import { messageBodySchema } from "@systems/schemas";
import { Request, Response, Router } from "express";
import { createNewNote } from "repositories/notes";
import { ValidationError } from "yup";

const notesRouter = Router();

notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const msgBody = messageBodySchema.validateSync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { note } = msgBody;

    const { newNoteData, id } = await createNewNote(note);

    res.send({ newNoteData, id });
  } catch (err) {
    console.error(err);

    if (err instanceof ValidationError) {
      return res.status(400).json({ errors: err.errors });
    }

    const error = err as Error;
    return res.status(500).json({ msg: error.message });
  }
});

export default notesRouter;
