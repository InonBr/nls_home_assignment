import { Col } from "react-bootstrap";
import NewNoteForm from "./components/NewNoteForm/NewNoteForm";

const App = () => {
  return (
    <div className="App">
      <Col xs={12} md={6}>
        <NewNoteForm />
      </Col>
    </div>
  );
};

export default App;
