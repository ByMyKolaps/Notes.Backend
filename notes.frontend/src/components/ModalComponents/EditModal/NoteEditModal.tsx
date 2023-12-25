import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import NoteEditModalProps from "./NoteEditModalProps";
import ModalProps from "../ModalProps";

const NoteEditModal: FC<{
  editProps: NoteEditModalProps;
  modalProps: ModalProps;
}> = ({ editProps, modalProps }) => {
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
            type="email"
            className="form-control"
            placeholder={editProps.note.title}
          />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          <label className="form-label">Note details</label>
          <textarea className="form-control" rows={5}>
            {editProps.note.details}
          </textarea>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-warning" onClick={modalProps.hide}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteEditModal;
