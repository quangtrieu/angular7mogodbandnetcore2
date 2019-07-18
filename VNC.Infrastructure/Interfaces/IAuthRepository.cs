using System.Threading.Tasks;
using VNC.Domain.Commons;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;

namespace VNC.Infrastructure.Interfaces
{
    public interface IAuthRepository
    {
        Task<User> GetUser(string username, string password);
        string Login(LoginDto loginDto, string SigningSecret, string ExpiryDuration);
        User IsAuthenticated(LoginDto useinfo, string SigningSecret, string ExpiryDuration);
    }
}
