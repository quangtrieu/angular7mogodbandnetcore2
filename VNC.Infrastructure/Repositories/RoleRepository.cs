using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;
using VNC.Infrastructure.Interfaces;

namespace VNC.Infrastructure.Repositories
{
    public class RoleRepository: IRoleRepository
    {
        private readonly IMongoDBContext _context;
        public RoleRepository(IMongoDBContext context)
        {
            _context = context;
        }

        public async Task Create(Role role)
        {
            await _context.Roles.InsertOneAsync(role);
        }

        public async Task<bool> Update(Role role)
        {
            ReplaceOneResult updateResult =
               await _context
                       .Roles
                       .ReplaceOneAsync(
                           filter: r => r.Id == role.Id,
                           replacement: role);

            return updateResult.IsAcknowledged
                    && updateResult.ModifiedCount > 0;
        }

        public async Task<bool> Delete(string id)
        {
            ObjectId objectIdentifier = new ObjectId(id);

            FilterDefinition<Role> filter = Builders<Role>.Filter.Eq(r => r.Id, objectIdentifier);

            DeleteResult deleteResult = await _context
                                                .Roles
                                                .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }
        public IEnumerable<Role> RoleDetails()
        {
            IEnumerable<Role> lstrole = new List<Role>();
            string response = "";
            try
            {
                lstrole = _context.Roles.Find(_ => true).ToList();

            }
            catch (Exception ex)
            {
                response = ex.ToString();
            }

            return lstrole;
        }
        public async Task<IEnumerable<Role>> GetAllRoles()
        {
            return await _context
                            .Roles
                            .Find(_ => true)
                            .ToListAsync();
        }

        public Task<Role> GetRoleById(string id)
        {
            ObjectId objectIdentifier = new ObjectId(id);

            FilterDefinition<Role> filter = Builders<Role>.Filter.Eq(r => r.Id, objectIdentifier);

            return _context
                    .Roles
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }

        public async Task<Role> GetRoleByName(string name)
        {

            var builder = Builders<Role>.Filter;
            var filter = builder.Eq("Name", name);

            return await _context.Roles
                        .Find(filter)
                        .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Role>> GetRolesIdAndName()
        {
            return await _context
                             .Roles
                             .Find(_ => true)
                             .ToListAsync();
        }
    }
}
