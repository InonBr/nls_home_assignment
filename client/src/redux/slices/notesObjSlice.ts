import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetAllNotesInterface } from "../../lib/apiInterfaces";

const initialState: { notes: GetAllNotesInterface } = { notes: {} };

export const notesObjSlice = createSlice({
  name: "notesObj",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<GetAllNotesInterface>) => {
      state.notes = action.payload;
    },
    //   pushToArr: (state, action: PayloadAction<GetAllNotesInterface>) => {},
  },
});

export const { setNotes } = notesObjSlice.actions;
export default notesObjSlice.reducer;
