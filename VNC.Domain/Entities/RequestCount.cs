using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using VNC.Domain.Entities.Common;

namespace VNC.Domain.Entities
{
    public class RequestCount: AuditableEntity
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public ObjectId UserId { get; set; }
        public string RequestUrl { get; set; }
        public string RequestIP { get; set; }
        public int RequestTotal { get; set; }
    }
}
