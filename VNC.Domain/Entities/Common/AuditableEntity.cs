using System;
using System.Collections.Generic;
using System.Text;

namespace VNC.Domain.Entities.Common
{
    public abstract class AuditableEntity : IAuditableEntity
    {
        public bool Deleted { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
    }
}
