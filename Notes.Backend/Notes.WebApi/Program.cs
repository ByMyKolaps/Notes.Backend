using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Notes.Application.Interfaces;
using Notes.Application.Mappings;
using Notes.Persistence;
using System;
using System.Reflection;
using Notes.Application;
using Notes.WebApi.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;

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

            builder.Services.AddAuthentication(config =>
            {
                config.DefaultAuthenticateScheme =
                    JwtBearerDefaults.AuthenticationScheme;
                config.DefaultChallengeScheme =
                    JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = "https://localhost:7113/";
                    options.Audience = "NotesWebAPI";
                    options.RequireHttpsMetadata = false;
                });

            var app = builder.Build();

            app.UseCustomExceptionHandler();
            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseCors("AllowALl");
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();

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