using MediatR;
using Microsoft.AspNetCore.Http;
using Notes.Application.Interfaces;
using Serilog;
using System.Threading;
using System.Threading.Tasks;
using System.Security.Claims;
using System;

namespace Notes.Application.Behaviors
{
    public class LoggingBehavior<TRequest, TResponse>
        : IPipelineBehavior<TRequest, TResponse> where TRequest
        : IRequest<TResponse>
    {
        private readonly ICurrentUserService _currentUserService;
        public LoggingBehavior(ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            var requestName = typeof(TRequest).Name;
            var userId = _currentUserService.UserId;
            Log.Information("Notes Request: {@Name} {@User} {@Request}",
                requestName, userId, request);
            var response = await next();
            return response;
        }
    }
}
