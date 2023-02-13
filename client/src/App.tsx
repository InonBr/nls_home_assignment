import { Col } from "react-bootstrap";
import NewNoteForm from "./components/NewNoteForm/NewNoteForm";
import { useEffect } from "react";
import { getAllNotes } from "./lib/api";
import { useSelector } from "react-redux";
import { GetAllNotesInterface } from "./lib/apiInterfaces";
import { useDispatch } from "react-redux";
import { setNotes } from "./redux/slices/notesObjSlice";

const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector(
    (state: { notes: GetAllNotesInterface }) => state.notes
  );

  useEffect(() => {
    const getNots = async () => {
      const data = await getAllNotes();
      dispatch(setNotes(data));
    };

    getNots();
  }, [dispatch]);

  return (
    <div className="App">
      <Col xs={12} md={6}>
        <NewNoteForm />
      </Col>
    </div>
  );
};

export default App;
