using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using VNC.Domain.Entities.Common;

namespace VNC.Domain.Entities
{
    public class Token: AuditableEntity
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public ObjectId UserId { get; set; }
        public string TokenKey { get; set; }
    }
}
