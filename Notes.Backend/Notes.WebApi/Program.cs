using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Notes.Application.Interfaces;
using Notes.Application.Mappings;
using Notes.Persistence;
using System;
using System.Reflection;
using Notes.Application;
using Notes.WebApi.Middleware;

namespace Notes.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAutoMapper(config =>
            {
                config.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
                config.AddProfile(new AssemblyMappingProfile(typeof(INotesDbContext).Assembly));
            });

            builder.Services.AddApplication();

            builder.Services.AddPersistence(builder.Configuration);

            builder.Services.AddControllers();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin();
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                });
            });

            var app = builder.Build();

            app.UseCustomExceptionHandler();
            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseCors("AllowALl");
            app.MapControllers();

            app.MapGet("/", () => "Hello World!");

            using (var scope = app.Services.CreateScope())
            {
                var serviceProvider = scope.ServiceProvider;
                try
                {
                    var context = serviceProvider.GetRequiredService<NotesDbContext>();
                    DbInitializer.Initialize(context);
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception);
                }
            }

            app.Run();
        }
    }
}