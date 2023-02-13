import { ListGroup } from "react-bootstrap";
import { Task } from "../../lib/apiInterfaces";
import { ImBin } from "react-icons/im";
import { MdDoneOutline, MdRemoveDone } from "react-icons/md";

type Props = {
  taskList: ReadonlyArray<Task>;
  done: boolean;
};

const NotesList = ({ taskList, done }: Props) => {
  console.log(taskList);

  return (
    <ListGroup className="m-3">
      <ListGroup.Item disabled>
        {done ? "Completed Tasks" : "Tasks To Complete"}
      </ListGroup.Item>
      {taskList.map((task) => (
        <ListGroup.Item variant={done ? "success" : "warning"} key={task.id}>
          <p>{task.note}</p>
          {new Date(task.date).toLocaleString("en-GB", { hour12: false })}
          <h5>
            {done ? <MdRemoveDone /> : <MdDoneOutline />} <ImBin />
          </h5>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default NotesList;
