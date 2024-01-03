import { FC, ReactElement, useRef, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { CreateNoteDto, Client, NoteDetailsVm } from "../../../api/api";
import NoteItem from "../NoteItem/NoteItem";
import NoteCreateModal from "../../ModalComponents/CreateModal/NoteCreateModal";

const apiClient = new Client("https://localhost:7156");

const NoteList: FC<{ userName: string }> = ({ userName }): ReactElement => {
  const [showCreate, setShowCreate] = useState(false);
  const handleCreateShow = () => setShowCreate(true);
  const handleCreateClose = () => setShowCreate(false);

  const [notes, setNotes] = useState<NoteDetailsVm[] | undefined>(undefined);

  async function getNotes() {
    const noteListVm = await apiClient.getAll("1.0");
    setNotes(noteListVm.notes);
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className="d-flex p-2 bd-highlight justify-content-between align-items-center">
        <h1 className="text-center">{userName}</h1>
        <Button variant="success" onClick={handleCreateShow}>
          Create note
        </Button>
      </div>
      {notes?.length != 0 ? (
        <div className="list-group mb-3">
          {notes?.map((note) => (
            <NoteItem key={note.id} note={note} onChange={getNotes}></NoteItem>
          ))}
        </div>
      ) : (
        <h3>You don't have any notes yet</h3>
      )}

      <NoteCreateModal
        modalProps={{ isShow: showCreate, hide: handleCreateClose }}
        createProps={{ onChange: getNotes }}
      ></NoteCreateModal>
    </>
  );
};

export default NoteList;
