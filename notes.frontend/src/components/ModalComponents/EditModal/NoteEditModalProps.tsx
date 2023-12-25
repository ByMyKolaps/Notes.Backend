import { NoteDetailsVm } from "../../../api/api";

interface NoteEditModalProps {
  note: NoteDetailsVm;
  onChange: () => Promise<void>;
}

export default NoteEditModalProps;
