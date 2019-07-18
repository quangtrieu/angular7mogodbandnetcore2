using MongoDB.Bson;
using System;

namespace VNC.Domain.ViewModel
{
    public class UserViewModel
    {
        public ObjectId Id { get; set; }
        public string IPAddress { get; set; }
        public string EmailAddress { get; set; }
        public DateTime ExpiresIn { get; set; }
        public string InExuer { get; set; }
        public string Gender { get; set; }
        public decimal LimitedTotal { get; set; }
    }
}
