import { FC } from "react";

import { ConvertToDate } from "../../../common/supportFunc/SupportFuncs";

import { Modal, Button } from "react-bootstrap";
import NoteDetailsModalProps from "./NoteDetailsModalProps";
import ModalProps from "../ModalProps";

const NoteDetailsModal: FC<{
  detailsProps: NoteDetailsModalProps;
  modalProps: ModalProps;
}> = ({ detailsProps, modalProps }) => {
  return (
    <Modal
      show={modalProps.isShow}
      onHide={modalProps.hide}
      backdrop={true}
      keyboard={false}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{detailsProps.note.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{detailsProps.note.details}</p>
        <div className="d-flex justify-content-between">
          <small className="fs-6">
            Creation date:{" "}
            {ConvertToDate(detailsProps.note.creationDate?.toString())}
          </small>
          <small className="fs-6">
            Last edit: {ConvertToDate(detailsProps.note.editDate?.toString())}
          </small>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-success" onClick={modalProps.hide}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteDetailsModal;
