using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using VNC.Domain.Entities.Common;

namespace VNC.Domain.Entities
{
    public class Role: AuditableEntity
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public virtual ICollection<UserInRole> UserInRoles { get; set; }
    }
}
