import { Col, Row } from "react-bootstrap";
import NewNoteForm from "./components/NewNoteForm/NewNoteForm";
import NotesList from "./components/NotesList/NotesList";
import { useDispatch, useSelector } from "react-redux";
import { GetAllNotesInterface } from "./lib/apiInterfaces";
import { useEffect } from "react";
import { getAllNotes } from "./lib/api";
import { setNotes } from "./redux/slices/notesObjSlice";

const App = () => {
  const dispatch = useDispatch();
  const notesObj = useSelector(
    (state: { notes: { value: GetAllNotesInterface } }) => state.notes.value
  );

  useEffect(() => {
    const getNots = async () => {
      const notesObj = await getAllNotes();
      dispatch(setNotes(notesObj));
    };

    getNots();
  }, [dispatch]);

  return (
    <div className="App">
      <Col xs={12} md={6}>
        <NewNoteForm />
      </Col>

      <Row>
        <Col xs={12} md={6}>
          <NotesList taskList={notesObj.tasksToComplete} />
        </Col>
        <Col xs={12} md={6}>
          <NotesList taskList={notesObj.doneTasks} />
        </Col>
      </Row>
    </div>
  );
};

export default App;
