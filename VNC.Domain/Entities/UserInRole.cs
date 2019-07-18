using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace VNC.Domain.Entities
{
    public class UserInRole
    {
        public ObjectId UserId { get; set; }
        public ObjectId RoleId { get; set; }

        public string Description { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("RoleId")]
        public virtual Role Role { get; set; }
    }
}
