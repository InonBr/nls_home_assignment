import { Button, ListGroup } from "react-bootstrap";
import { Task } from "../../lib/apiInterfaces";
import { ImBin } from "react-icons/im";
import { MdDoneOutline, MdRemoveDone } from "react-icons/md";
import "../styles/noteList.css";
import { deleteNote } from "../../lib/api";
import { TaskActions } from "../../ustils";
import { useDispatch } from "react-redux";
import { deleteFromList } from "../../redux/slices/notesObjSlice";

type Props = {
  taskList: ReadonlyArray<Task>;
  done: boolean;
};

const NotesList = ({ taskList, done }: Props) => {
  const dispatch = useDispatch();

  const clickEventsHandler = async ({
    taskId,
    buttonName,
    done,
  }: TaskActions) => {
    if (buttonName === "delete") {
      const deletedNoteId = await deleteNote(taskId);
      dispatch(deleteFromList({ taskId: deletedNoteId, buttonName, done }));
    }
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
                <Button
                  variant="outline-light"
                  onClick={() =>
                    clickEventsHandler({
                      taskId: task.id,
                      buttonName: "unDone",
                      done: task.doneTask,
                    })
                  }
                >
                  <MdRemoveDone color="#DC582A" size={20} />
                </Button>
              </span>
            ) : (
              <span className="margin-left">
                <Button
                  variant="outline-light"
                  key={task.id}
                  onClick={() =>
                    clickEventsHandler({
                      taskId: task.id,
                      buttonName: "markDone",
                      done: task.doneTask,
                    })
                  }
                >
                  <MdDoneOutline color="#023020" size={20} />
                </Button>
              </span>
            )}

            <Button
              variant="outline-light"
              onClick={() =>
                clickEventsHandler({
                  taskId: task.id,
                  buttonName: "delete",
                  done: task.doneTask,
                })
              }
            >
              <ImBin color="#6f0000" />
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default NotesList;
