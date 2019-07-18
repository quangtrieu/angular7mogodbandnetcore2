using System.Collections.Generic;
using System.Threading.Tasks;
using VNC.Domain.Entities;

namespace VNC.Infrastructure.Interfaces
{
    public interface IRequestCountRepository
    {
        Task<IEnumerable<RequestCount>> GetAllRequestCounts();
        Task<RequestCount> GetRequestCountById(string Id);
    }
}
