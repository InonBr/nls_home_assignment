import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesObjSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});
