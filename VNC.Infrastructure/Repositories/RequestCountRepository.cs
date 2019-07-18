using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using VNC.Domain.Entities;
using VNC.Infrastructure.Interfaces;

namespace VNC.Infrastructure.Repositories
{
    public class RequestCountRepository : IRequestCountRepository
    {
        private readonly IMongoDBContext _context;

        public RequestCountRepository(IMongoDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RequestCount>> GetAllRequestCounts()
        {
            return await _context
                           .RequestCounts
                           .Find(_ => true)
                           .ToListAsync();
        }

        public async Task<RequestCount> GetRequestCountById(string Id)
        {
            ObjectId objectIdentifier = new ObjectId(Id);

            FilterDefinition<RequestCount> filter = Builders<RequestCount>.Filter.Eq(m => m.Id, objectIdentifier);

            return await _context
                    .RequestCounts
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }
    }
}
