import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetAllNotesInterface, Task } from "../../lib/apiInterfaces";

const initialState: { notes: GetAllNotesInterface } = {
  notes: { doneTasks: [], tasksToComplete: [] },
};

export const notesObjSlice = createSlice({
  name: "notesObj",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<GetAllNotesInterface>) => {
      state.notes = action.payload;
    },
    pushToArr: (state, action: PayloadAction<Task>) => {
      const key = action.payload.doneTask ? "doneTasks" : "tasksToComplete";

      state.notes[key] = {
        ...state.notes[key],
        ...[action.payload, ...state.notes[key]],
      };

      return state;
    },
  },
});

export const { setNotes, pushToArr } = notesObjSlice.actions;
export default notesObjSlice.reducer;
