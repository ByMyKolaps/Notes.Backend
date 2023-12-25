import { FC, ReactElement, useRef, useEffect, useState } from "react";
import { CreateNoteDto, Client, NoteDetailsVm } from "../../../api/api";
import { FormControl } from "react-bootstrap";
import NoteItem from "../NoteItem/NoteItem";

const apiClient = new Client("https://localhost:7156");

async function createNote(note: CreateNoteDto) {
  await apiClient.create("1.0", note);
  console.log("Note is created");
}

const NoteList: FC<{}> = (): ReactElement => {
  let textInput = useRef(null);
  const [notes, setNotes] = useState<NoteDetailsVm[] | undefined>(undefined);

  async function getNotes() {
    const noteListVm = await apiClient.getAll("1.0");
    setNotes(noteListVm.notes);
  }

  useEffect(() => {
    getNotes();
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      const note: CreateNoteDto = {
        title: event.currentTarget.value,
      };
      createNote(note).then(() => getNotes());
      event.currentTarget.value = "";
    }
  };

  return (
    <div>
      {/* <div>
        <FormControl ref={textInput} onKeyPress={handleKeyPress}></FormControl>
      </div> */}
      <div>
        {notes?.map((note) => (
          <NoteItem key={note.id} note={note} onChange={getNotes}></NoteItem>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
