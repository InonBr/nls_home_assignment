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
