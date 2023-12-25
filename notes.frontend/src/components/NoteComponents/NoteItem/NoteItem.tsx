import { FC, ReactElement, useRef, useEffect, useState } from "react";

import NoteDetailsModal from "../../ModalComponents/DetailsModal/NoteDetailsModal";
import NoteItemProps from "./NoteItemProps";
import { ConvertToDate } from "../../../common/supportFunc/SupportFuncs";
import NoteDeleteModal from "../../ModalComponents/DeleteModal/NoteDeleteModal";
import NoteEditModal from "../../ModalComponents/EditModal/NoteEditModal";
import { Button, Modal, ModalHeader } from "react-bootstrap";

const NoteItem: FC<NoteItemProps> = ({ note, onChange }): ReactElement => {
  const [showDetails, setShowDetails] = useState(false);
  const handleDetailsClose = () => setShowDetails(false);
  const handleDetailsShow = () => setShowDetails(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => setShowEdit(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  return (
    <div className="list-group">
      <div className="list-group-item list-group-item-action">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{note.title}</h5>
        </div>
        <div className="d-flex w-100 justify-content-between">
          <small className="fs-6">
            Creation date: {ConvertToDate(note.creationDate?.toString())}
          </small>
          <small className="fs-6">
            Last edit: {ConvertToDate(note.editDate?.toString())}
          </small>
        </div>
        <div className="my-2">
          <Button className="btn btn-primary me-2" onClick={handleDetailsShow}>
            Details
          </Button>
          <Button className="btn btn-warning me-2" onClick={handleEditShow}>
            Edit
          </Button>
          <Button className="btn btn-danger me-2" onClick={handleDeleteShow}>
            Delete
          </Button>
        </div>
      </div>

      <NoteDetailsModal
        detailsProps={{ note, onChange }}
        modalProps={{ isShow: showDetails, hide: handleDetailsClose }}
      ></NoteDetailsModal>

      <NoteEditModal
        editProps={{ note, onChange }}
        modalProps={{ isShow: showEdit, hide: handleEditClose }}
      ></NoteEditModal>

      <NoteDeleteModal
        deleteProps={{ noteId: note.id!, onChange }}
        modalProps={{ isShow: showDelete, hide: handleDeleteClose }}
      ></NoteDeleteModal>
    </div>
  );
};

export default NoteItem;
