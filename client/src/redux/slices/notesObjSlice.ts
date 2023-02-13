import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetAllNotesInterface, Task } from "../../lib/apiInterfaces";

const initialState: { value: GetAllNotesInterface } = {
  value: { doneTasks: [], tasksToComplete: [] },
};

export const notesObjSlice = createSlice({
  name: "notesObj",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<GetAllNotesInterface>) => {
      state.value = action.payload;
    },
    pushToArr: (state, action: PayloadAction<Task>) => {
      const key = action.payload.doneTask ? "doneTasks" : "tasksToComplete";

      state.value[key] = {
        ...state.value[key],
        ...[action.payload, ...state.value[key]],
      };

      return state;
    },
  },
});

export const { setNotes, pushToArr } = notesObjSlice.actions;
export default notesObjSlice.reducer;
