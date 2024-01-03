import { FC, useState } from "react";
import NoteCreateModalProps from "./NoteCreateModalProps";
import { Button, Modal } from "react-bootstrap";

import { Client, CreateNoteDto } from "../../../api/api";
import ModalProps from "../ModalProps";

const apiClient = new Client("https://localhost:7156");

async function createNote(note: CreateNoteDto) {
  await apiClient.create("1", note);
  console.log("Note created");
}

const defaultValue: CreateNoteDto = {
  details: "",
  title: "",
};

const NoteCreateModal: FC<{
  createProps: NoteCreateModalProps;
  modalProps: ModalProps;
}> = ({ createProps, modalProps }) => {
  const [note, setNote] = useState<CreateNoteDto>(defaultValue);

  const handleCreate = async () => {
    if (!note.details) note.details = "";
    createNote(note).then(createProps.onChange);
    handleHide();
  };

  const handleHide = () => {
    note.details = "";
    note.title = "";
    modalProps.hide();
  };

  return (
    <Modal
      show={modalProps.isShow}
      onHide={modalProps.hide}
      backdrop={true}
      keyboard={false}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <input
            className="form-control"
            placeholder="Enter note title"
            onChange={(e) => {
              setNote((prev) => ({
                ...prev,
                title: e.target.value,
              }));
            }}
            value={note.title}
          />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <label className="form-label">Note details</label>
          <textarea
            className="form-control"
            rows={5}
            onChange={(e) => {
              setNote((prev) => ({
                ...prev,
                details: e.target.value,
              }));
            }}
            value={note.details}
          ></textarea>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn"
          variant="outline-success"
          onClick={handleCreate}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteCreateModal;
