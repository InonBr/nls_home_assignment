import { Col } from "react-bootstrap";
import NewNoteForm from "./components/NewNoteForm/NewNoteForm";
import NotesList from "./components/NotesList/NotesList";

const App = () => {
  return (
    <div className="App">
      <Col xs={12} md={6}>
        <NewNoteForm />
        <NotesList />
      </Col>
    </div>
  );
};

export default App;
