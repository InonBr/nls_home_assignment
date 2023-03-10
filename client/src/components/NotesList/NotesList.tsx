import { Button, ListGroup } from "react-bootstrap";
import { Task } from "../../lib/apiInterfaces";
import { ImBin } from "react-icons/im";
import { MdDoneOutline, MdRemoveDone } from "react-icons/md";
import { deleteNote, updateNoteStatus } from "../../lib/api";
import { TaskActions } from "../../utils";
import { useDispatch } from "react-redux";
import {
  changeDoneStatus,
  deleteFromList,
} from "../../redux/slices/notesObjSlice";
import "../styles/noteList.css";

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

    if (buttonName === "changeStatus") {
      const updatedNote = await updateNoteStatus(taskId);
      const { date, doneTask, id, note } = updatedNote;

      dispatch(
        changeDoneStatus({
          date,
          id,
          note,
          updateTo: doneTask,
          updateFrom: !doneTask,
        })
      );
    }
  };

  return (
    <ListGroup className="m-3">
      <ListGroup.Item disabled>
        {done ? "Completed Tasks" : "Tasks To Complete"}
      </ListGroup.Item>
      {taskList.map((task) => (
        <ListGroup.Item
          key={task.id}
          className={`${
            task.doneTask ? "completed-task-bg" : "task-to-complete-bg"
          }`}
        >
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
                      buttonName: "changeStatus",
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
                      buttonName: "changeStatus",
                      done: task.doneTask,
                    })
                  }
                >
                  <MdDoneOutline color="#3C783C" size={20} />
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
