using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;

namespace VNC.Infrastructure.Interfaces
{
    public interface IRoleRepository
    {
        IEnumerable<Role> RoleDetails();
        Task<IEnumerable<Role>> GetAllRoles();
        Task<IEnumerable<Role>> GetRolesIdAndName();
        Task<Role> GetRoleById(string id);
        Task<Role> GetRoleByName(string name);
        Task Create(Role role);
        Task<bool> Update(Role role);
        Task<bool> Delete(string id);
    }
}
