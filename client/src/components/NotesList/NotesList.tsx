import { Button, ListGroup } from "react-bootstrap";
import { Task } from "../../lib/apiInterfaces";
import { ImBin } from "react-icons/im";
import { MdDoneOutline, MdRemoveDone } from "react-icons/md";
import "../styles/noteList.css";

type Props = {
  taskList: ReadonlyArray<Task>;
  done: boolean;
};

const NotesList = ({ taskList, done }: Props) => {
  const clickEventsHandler = async (data: any) => {
    console.log(data);
  };

  return (
    <ListGroup className="m-3">
      <ListGroup.Item disabled>
        {done ? "Completed Tasks" : "Tasks To Complete"}
      </ListGroup.Item>
      {taskList.map((task) => (
        <ListGroup.Item variant={done ? "success" : "warning"} key={task.id}>
          <p>{task.note}</p>
          {new Date(task.date).toLocaleString("en-GB", { hour12: false })}
          <div className="mt-2">
            {done ? (
              <span className="margin-left">
                <Button variant="outline-light">
                  <MdRemoveDone color="#DC582A" size={20} />
                </Button>
              </span>
            ) : (
              <span className="margin-left">
                <Button variant="outline-light">
                  <MdDoneOutline color="#023020" size={20} />
                </Button>
              </span>
            )}

            <Button variant="outline-light">
              <ImBin color="#6f0000" />
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default NotesList;
