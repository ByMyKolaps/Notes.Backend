import { UpdateNoteDto } from "../../../api/api";

interface NoteEditModalProps {
  note: UpdateNoteDto;
  onChange: () => Promise<void>;
}

export default NoteEditModalProps;
