import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GetAllNotesInterface } from "../../lib/apiInterfaces";
import { useEffect } from "react";
import { setNotes } from "../../redux/slices/notesObjSlice";
import { getAllNotes } from "../../lib/api";

const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(
    (state: { notes: GetAllNotesInterface }) => state.notes
  );

  useEffect(() => {
    const getNots = async () => {
      const notesObj = await getAllNotes();
      dispatch(setNotes(notesObj));
    };

    getNots();
  }, [dispatch]);

  console.log(notes);
  return <h1>hello world</h1>;
};

export default NotesList;
