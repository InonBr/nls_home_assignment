import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { createNewNote } from "../../lib/api";
import { useDispatch } from "react-redux";
import { pushToArr } from "../../redux/slices/notesObjSlice";
import "../styles/form.css";

const NewNoteForm = () => {
  const dispatch = useDispatch();
  const [noteLength, setNoteLength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const { newNote } = data;
    const newNoteData = await createNewNote(newNote);
    dispatch(pushToArr(newNoteData));
  };

  return (
    <Form className="m-3" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor="newNote">Create New Note</Form.Label>
        <Form.Control
          id="newNote"
          type="text"
          as="textarea"
          rows={3}
          onInput={(e) => {
            setNoteLength(e.currentTarget.value.length);
          }}
          aria-invalid={errors.newNote ? "true" : "false"}
          {...register("newNote", { required: true, maxLength: 250 })}
        />
        <Form.Label className="text-muted">{`${noteLength} / 250`}.</Form.Label>

        <Form.Group>
          {errors.newNote && errors.newNote.type === "required" && (
            <Form.Label className="red-text" role="alert">
              Text is required
            </Form.Label>
          )}

          {errors.newNote && errors.newNote.type === "maxLength" && (
            <Form.Label className="red-text" role="alert">
              Text is too long
            </Form.Label>
          )}
        </Form.Group>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewNoteForm;
