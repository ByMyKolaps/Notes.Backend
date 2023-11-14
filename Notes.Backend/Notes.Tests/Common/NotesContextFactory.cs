using Microsoft.EntityFrameworkCore;
using Notes.Domain;
using Notes.Persistence;

namespace Notes.Tests.Common
{
    public class NotesContextFactory
    {
        public static Guid UserAId = Guid.NewGuid();
        public static Guid UserBId = Guid.NewGuid();

        public static Guid NoteIdForDelete = Guid.NewGuid();
        public static Guid NoteIdForUpdate = Guid.NewGuid();

        public static NotesDbContext Create()
        {
            var options = new DbContextOptionsBuilder<NotesDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            var context = new NotesDbContext(options);
            context.Database.EnsureCreated();
            context.Notes.AddRange(
                new Note
                {
                    UserId = UserAId,
                    Id = Guid.Parse("86B60C2F-1E25-4774-9BDD-2D3F79D93867"),
                    Title = "Title1",
                    Details = "Details1",
                    CreationDate = DateTime.Today,
                    EditDate = null,
                },
                new Note
                {
                    UserId = UserBId,
                    Id = Guid.Parse("A7FDD080-FCDE-408E-85EC-CAB26AC46A35"),
                    Title = "Title2",
                    Details = "Details2",
                    CreationDate = DateTime.Today,
                    EditDate = null,
                },
                new Note
                {
                    UserId = UserAId,
                    Id = NoteIdForDelete,
                    Title = "Title3",
                    Details = "Details3",
                    CreationDate = DateTime.Today,
                    EditDate = null,
                },
                new Note
                {
                    UserId = UserBId,
                    Id = NoteIdForUpdate,
                    Title = "Title4",
                    Details = "Details4",
                    CreationDate = DateTime.Today,
                    EditDate = null,
                }
            );
            context.SaveChanges();
            return context;
        }

        public static void Destroy(NotesDbContext context)
        {
            context.Database.EnsureDeleted();
            context.Dispose();
        }

    }
}
