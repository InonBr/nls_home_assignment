import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetAllNotesInterface, Task } from "../../lib/apiInterfaces";
import { TaskActions, TaskUpdateInterface } from "../../utils";

const initialState: { value: GetAllNotesInterface } = {
  value: { doneTasks: [], tasksToComplete: [] },
};

export const notesObjSlice = createSlice({
  name: "notesObj",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<GetAllNotesInterface>) => {
      state.value["tasksToComplete"] = action.payload["tasksToComplete"] ?? [];
      state.value["doneTasks"] = action.payload["doneTasks"] ?? [];
    },
    pushToArr: (state, action: PayloadAction<Task>) => {
      const key = action.payload.doneTask ? "doneTasks" : "tasksToComplete";

      state.value[key] = [...[action.payload, ...state.value[key]]];

      return state;
    },
    deleteFromList: (state, action: PayloadAction<TaskActions>) => {
      const { done, taskId } = action.payload;
      const key = done ? "doneTasks" : "tasksToComplete";

      state.value[key] = state.value[key].filter((item) => item.id !== taskId);
    },
    changeDoneStatus: (state, action: PayloadAction<TaskUpdateInterface>) => {
      const { updateFrom, updateTo } = action.payload;
      const keyToAddTo = updateTo ? "doneTasks" : "tasksToComplete";
      const keyToRemoveFrom = updateFrom ? "doneTasks" : "tasksToComplete";

      console.log("keyToAddTo", keyToAddTo);
      console.log("keyToRemoveFrom", keyToRemoveFrom);
    },
  },
});

export const { setNotes, pushToArr, deleteFromList, changeDoneStatus } =
  notesObjSlice.actions;
export default notesObjSlice.reducer;
