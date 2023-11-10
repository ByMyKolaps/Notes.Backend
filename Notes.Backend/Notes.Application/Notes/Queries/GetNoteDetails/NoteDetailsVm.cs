using AutoMapper;
using Notes.Application.Mappings;
using Notes.Domain;
using System;

namespace Notes.Application.Notes.Queries.GetNoteDetails
{
    public class NoteDetailsVm : IMapWith<Note>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? EditDate { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Note, NoteDetailsVm>()
                .ForMember(noteVm => noteVm.Title,
                    options => options.MapFrom(note => note.Title))
                .ForMember(noteVm => noteVm.Details,
                    options => options.MapFrom(note => note.Details))
                .ForMember(noteVm => noteVm.Id,
                    options => options.MapFrom(note => note.Id))
                .ForMember(noteVm => noteVm.CreationDate,
                    options => options.MapFrom(note => note.CreationDate))
                .ForMember(noteVm => noteVm.EditDate,
                    options => options.MapFrom(note => note.EditDate));
        }
    }
}
