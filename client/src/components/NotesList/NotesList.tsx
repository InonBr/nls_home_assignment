import { Task } from "../../lib/apiInterfaces";

type Props = {
  taskList: ReadonlyArray<Task>;
};

const NotesList = ({ taskList }: Props) => {
  console.log(taskList);
  return <h1>hello world</h1>;
};

export default NotesList;
