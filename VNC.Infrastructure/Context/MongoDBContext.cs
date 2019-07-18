using Microsoft.Extensions.Options;
using MongoDB.Driver;
using VNC.Domain.Entities;
using VNC.Infrastructure.Interfaces;

namespace VNC.Infrastructure.Context
{
    public class MongoDBContext: IMongoDBContext
    {
        private readonly IMongoDatabase _db;

        public MongoDBContext(IOptions<Settings> options, IMongoClient client)
        {
            _db = client.GetDatabase(options.Value.Database);
        }

        public IMongoCollection<User> Users => _db.GetCollection<User>("Users");
        public IMongoCollection<Token> Tokens => _db.GetCollection<Token>("Tokens");
        public IMongoCollection<Role> Roles => _db.GetCollection<Role>("Roles");
        public IMongoCollection<UserInRole> UserInRoles => _db.GetCollection<UserInRole>("UserInRoles");
        public IMongoCollection<RequestCount> RequestCounts => _db.GetCollection<RequestCount>("RequestCounts");
    }
}
