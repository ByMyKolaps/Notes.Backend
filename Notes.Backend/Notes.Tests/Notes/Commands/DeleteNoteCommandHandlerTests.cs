using Microsoft.EntityFrameworkCore;
using Notes.Application.Exceptions;
using Notes.Application.Notes.Commands.DeleteNote;
using Notes.Tests.Common;

namespace Notes.Tests.Notes.Commands
{
    public class DeleteNoteCommandHandlerTests : TestCommandBase
    {
        [Fact]
        public async Task DeleteNoteCommandHandler_Success()
        {
            // Arrange
            var handler = new DeleteNoteCommandHandler(Context);

            // Act
            await handler.Handle(
                new DeleteNoteCommand
                {
                    UserId = NotesContextFactory.UserAId,
                    Id = NotesContextFactory.NoteIdForDelete
                },
                CancellationToken.None);

            // Assert
            Assert.Null(
                await Context.Notes.SingleOrDefaultAsync(note =>
                    note.Id == NotesContextFactory.NoteIdForDelete));
        }

        [Fact]
        public async Task DeleteNoteCommandHandler_FailOnWrongId()
        {
            // Arrange
            var handler = new DeleteNoteCommandHandler(Context);

            // Act
            // Assert
            await Assert.ThrowsAsync<NotFoundException>(async () =>
                await handler.Handle(
                    new DeleteNoteCommand
                    {
                        UserId = NotesContextFactory.UserAId,
                        Id = Guid.NewGuid()
                    }, CancellationToken.None));
        }

        [Fact]
        public async Task DeleteNoteCommandHandler_FailOnWrongUserId()
        {
            // Arrange
            var handler = new DeleteNoteCommandHandler(Context);

            // Act
            // Assert
            await Assert.ThrowsAsync<NotFoundException>(async () =>
                await handler.Handle(
                    new DeleteNoteCommand
                    {
                        UserId = NotesContextFactory.UserBId,
                        Id = NotesContextFactory.NoteIdForDelete
                    }, CancellationToken.None));
            
        }


    }
}
