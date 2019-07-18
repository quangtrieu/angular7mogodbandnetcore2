using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using VNC.Domain.Entities.Common;

namespace VNC.Domain.Entities
{
    public class User: AuditableEntity
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string AccessToken { get; set; }
        public string IPAddress { get; set; }
        public string EmailAddress { get; set; }
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime ExpiresIn { get; set; }
        public string InExuer { get; set; }
        public string Gender { get; set; }
        public int LimitedTotal { get; set; }
        public List<Token> Tokens { get; set; }
        public List<UserDetail> RoleDetails { get; set; }
    }
}
