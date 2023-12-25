import { NoteDetailsVm } from "../../../api/api";

interface NoteDetailsModalProps {
  note: NoteDetailsVm;
  onChange: () => Promise<void>;
}

export default NoteDetailsModalProps;
