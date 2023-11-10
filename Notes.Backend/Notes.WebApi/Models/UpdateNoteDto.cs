using AutoMapper;
using Notes.Application.Mappings;
using Notes.Application.Notes.Commands.UpdateNote;
using System;

namespace Notes.WebApi.Models
{
    public class UpdateNoteDto : IMapWith<UpdateNoteCommand>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<UpdateNoteDto, UpdateNoteCommand>()
                .ForMember(noteCommand => noteCommand.Id,
                    options => options.MapFrom(noteDto => noteDto.Id))
                .ForMember(noteCommand => noteCommand.Title,
                    options => options.MapFrom(noteDto => noteDto.Title))
                .ForMember(noteCommand => noteCommand.Details,
                    options => options.MapFrom(noteDto => noteDto.Details));
        }
    }
}
