import ToDoNoteModel from "@models/ToDoNoteModel";

export const createNewNote = async (note: string) => {
  const newNoteData = new ToDoNoteModel({
    note,
  });

  console.log(newNoteData);

  await newNoteData.save();

  const { _id, date, doneTask } = newNoteData;

  return { id: _id.toString(), date, doneTask };
};

export const getAllNotes = async () => ToDoNoteModel.find().sort({ date: -1 });

export const deleteNoteById = async (noteId: string) => {
  await ToDoNoteModel.findByIdAndDelete(noteId);
};

export const findNoteById = async (noteId: string) =>
  await ToDoNoteModel.findById(noteId);

export const updateNoteStatus = async ({
  noteId,
  noteCurrentStatus,
}: {
  noteId: string;
  noteCurrentStatus: boolean;
}) =>
  await ToDoNoteModel.findOneAndUpdate(
    { _id: noteId },
    { doneTask: !noteCurrentStatus }
  );
