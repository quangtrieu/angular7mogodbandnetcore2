using System.Collections.Generic;
using System.Threading.Tasks;
using VNC.Domain.Commons;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;

namespace VNC.Infrastructure.Interfaces
{
    public interface ITokenRepository
    {
        Task<IEnumerable<Token>> GetAllTokens();
        
        Task<Token> GetTokenById(string Id);

        Task Create(Token token);

        Task<bool> Update(Token token);

        Task<bool> Delete(string Id);

        Task<List<User>> GetUsers();

        Task<IEnumerable<TokenViewModel>> GetAllUserTokens();

        Task<ResponseModel<List<TokenViewModel>>> GetTokenByUser();
    }
}
