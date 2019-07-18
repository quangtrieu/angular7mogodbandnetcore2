﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace VNC.Domain.Entities
{
    public class UserDetail
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string Name { get; set; }
    }
}
