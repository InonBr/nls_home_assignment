import { Col } from "react-bootstrap";
import NewNoteForm from "./components/NewNoteForm/NewNoteForm";
import { useEffect } from "react";
import { getAllNotes } from "./lib/api";

const App = () => {
  useEffect(() => {
    const getNots = async () => {
      const data = await getAllNotes();
      console.log(data);
    };

    getNots();
  }, []);
  return (
    <div className="App">
      <Col xs={12} md={6}>
        <NewNoteForm />
      </Col>
    </div>
  );
};

export default App;
