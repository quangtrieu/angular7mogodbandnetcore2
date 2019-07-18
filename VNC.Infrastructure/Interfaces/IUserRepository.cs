using System.Collections.Generic;
using System.Threading.Tasks;
using VNC.Domain.Commons;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;

namespace VNC.Infrastructure.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUser();
        User GetUserId(string id);
        Task<User> GetUserById(string id);
        Task<User> GetUserByName(string username);
        Task<ResponseModel<List<UserDataTransformation>>> GetAllUsers(string username, string emailAddress, int currentPageNumber, int pageSize, string sortExpression, string sortDirection);
        Task<ResponseModel<UserDataTransformation>> GetUserDetail(string userId);
        Task CreateUser(DataTransformationUser dataTransformationUser);
        Task Create(User user);
        Task<bool> Update(User user);
        Task<bool> Delete(string id);

        Task<User> ChangePassword(UserChangePassword userChangePassword);
    }
}
