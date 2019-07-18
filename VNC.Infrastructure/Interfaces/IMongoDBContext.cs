using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using VNC.Domain.Entities;

namespace VNC.Infrastructure.Interfaces
{
    public interface IMongoDBContext
    {
        IMongoCollection<User> Users { get; }
        IMongoCollection<Token> Tokens { get; }
        IMongoCollection<Role> Roles { get; }
        IMongoCollection<UserInRole> UserInRoles { get; }
        IMongoCollection<RequestCount> RequestCounts { get; }
    }
}
