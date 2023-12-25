import { NoteDetailsVm } from "../../../api/api";

interface NoteItemProps {
  note: NoteDetailsVm;
  onChange: () => Promise<void>;
}

export default NoteItemProps;
