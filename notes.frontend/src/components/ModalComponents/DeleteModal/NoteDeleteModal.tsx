import { FC } from "react";
import { Client } from "../../../api/api";
import { Button, Modal } from "react-bootstrap";
import ModalProps from "../ModalProps";
import NoteDeleteModalProps from "./NoteDeleteModalProps";

const apiClient = new Client("https://localhost:7156");

async function deleteNote(noteId: string) {
  await apiClient.delete(noteId, "1");
  console.log("Note is deleted");
}

const NoteDeleteModal: FC<{
  deleteProps: NoteDeleteModalProps;
  modalProps: ModalProps;
}> = ({ deleteProps, modalProps }) => {
  const handleDelete = () => {
    deleteNote(deleteProps.noteId).then(deleteProps.onChange);
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
        <Modal.Title>Are you sure you want to delete the note?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button className="btn btn-danger" onClick={handleDelete}>
          Yes
        </Button>
        <Button className="btn btn-secondary" onClick={modalProps.hide}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteDeleteModal;
