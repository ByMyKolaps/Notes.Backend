using Microsoft.EntityFrameworkCore;
using Notes.Application.Exceptions;
using Notes.Application.Notes.Commands.UpdateNote;
using Notes.Tests.Common;

namespace Notes.Tests.Notes.Commands
{
    public class UpdateNoteCommandHandlerTests : TestCommandBase
    {
        [Fact]
        public async Task UpdateNoteCommandHandler_Success()
        {
            // Arrange
            var handler = new UpdateNoteCommandHandler(Context);
            var newTitle = "some new title";

            // Act
            await handler.Handle(new UpdateNoteCommand
                {
                    UserId = NotesContextFactory.UserBId,
                    Id = NotesContextFactory.NoteIdForUpdate,
                    Title = newTitle,
                }, CancellationToken.None);

            // Assert
            Assert.NotNull(await Context.Notes.SingleOrDefaultAsync(note =>
                note.Id == NotesContextFactory.NoteIdForUpdate && 
                note.Title == newTitle));
        }

        [Fact]
        public async Task UpdateNoteCommandHandler_FailOnWrongId()
        {
            // Arrange
            var handler = new UpdateNoteCommandHandler(Context);
            var newTitle = "some new title";

            // Act
            // Assert
            await Assert.ThrowsAsync<NotFoundException>(async () =>
                await handler.Handle(new UpdateNoteCommand
                {
                    UserId = NotesContextFactory.UserAId,
                    Id = Guid.NewGuid(),
                    Title = newTitle
                }, CancellationToken.None));
        }

        [Fact]
        public async Task UpdateNoteCommandHandler_FailOnWrongUserId()
        {
            // Arrange
            var handler = new UpdateNoteCommandHandler(Context);
            var newTitle = "some new title";

            // Act
            // Assert
            await Assert.ThrowsAsync<NotFoundException>(async () =>
                await handler.Handle(new UpdateNoteCommand
                {
                    UserId = NotesContextFactory.UserAId,
                    Id = NotesContextFactory.NoteIdForUpdate,
                    Title = newTitle
                }, CancellationToken.None));
        }
    }
}
