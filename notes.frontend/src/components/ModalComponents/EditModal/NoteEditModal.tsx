import { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import NoteEditModalProps from "./NoteEditModalProps";
import ModalProps from "../ModalProps";
import { Client, UpdateNoteDto } from "../../../api/api";

const apiClient = new Client("https://localhost:7156");

async function editNote(note: UpdateNoteDto) {
  await apiClient.update("1", note);
  console.log("Note updated");
}

const NoteEditModal: FC<{
  editProps: NoteEditModalProps;
  modalProps: ModalProps;
}> = ({ editProps, modalProps }) => {
  const [newNote, setNewNote] = useState<UpdateNoteDto>(editProps.note);

  const handleUpdate = async () => {
    if (!newNote.details) newNote.details = "";
    editNote(newNote).then(editProps.onChange);
    handleHide();
  };

  const handleHide = () => {
    setNewNote(newNote);
    modalProps.hide();
  };

  console.log("Hello from edit modal");

  return (
    <Modal
      show={modalProps.isShow}
      onHide={handleHide}
      backdrop={true}
      keyboard={false}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <input
            className="form-control"
            placeholder={newNote.title}
            onChange={(e) => {
              setNewNote((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
          />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <label className="form-label">Note details</label>
          <textarea
            className="form-control"
            rows={5}
            onChange={(e) =>
              setNewNote((prev) => ({
                ...prev,
                details: e.target.value,
              }))
            }
            value={newNote.details}
          ></textarea>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-warning" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteEditModal;
