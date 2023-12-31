﻿using AutoMapper;
using Notes.Application.Interfaces;
using Notes.Application.Mappings;
using Notes.Persistence;

namespace Notes.Tests.Common
{
    public class QueryTestFixture : IDisposable
    {
        public readonly NotesDbContext Context;
        public readonly IMapper Mapper;

        public QueryTestFixture()
        {
            Context = NotesContextFactory.Create();
            var configurationProvider = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AssemblyMappingProfile(
                    typeof(INotesDbContext).Assembly));
            });
            Mapper = configurationProvider.CreateMapper();
        }

        public void Dispose()
        {
            NotesContextFactory.Destroy(Context);
        }

        [CollectionDefinition("QueryCollection")]
        public class QueryCollection : ICollectionFixture<QueryTestFixture> { }
    }
}
