using Notes.Application.Notes.Queries.GetNoteDetails;
using System.Collections.Generic;

namespace Notes.Application.Notes.Queries.GetNoteList
{
    public class NoteListVm
    {
        public IList<NoteDetailsVm> Notes { get; set; }
    }
}
