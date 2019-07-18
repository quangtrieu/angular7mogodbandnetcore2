using System;
using System.Collections.Generic;
using System.Text;

namespace VNC.Domain.ViewModel
{
    public class DataTransformationUser
    {
        public string id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }
        public string AccessToken { get; set; }
        public string IPAddress { get; set; }
        public DateTime ExpiresIn { get; set; }
        public string InExuer { get; set; }
        public string Gender { get; set; }
        public int LimitedTotal { get; set; }
        public List<DetailDataTransformationUserRole> RoleDetails { get; set; }
    }
}
