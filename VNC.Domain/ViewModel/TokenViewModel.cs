using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;


namespace VNC.Domain.ViewModel
{
    public class TokenViewModel
    {
        public ObjectId Id { get; set; }
        public ObjectId UserId { get; set; }
        public string UserName { get; set; }
        public string TokenKey { get; set; }
  
    }
}
