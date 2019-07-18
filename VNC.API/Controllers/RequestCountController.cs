using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VNC.Domain.Entities;
using VNC.Infrastructure.Interfaces;

namespace VNC.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestCountController : ControllerBase
    {
        private readonly IRequestCountRepository _requestCountRepository;

        public RequestCountController(IRequestCountRepository requestCountRepository)
        {
            _requestCountRepository = requestCountRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RequestCount>>> Get()
        {
            var tokens = await _requestCountRepository.GetAllRequestCounts();
            return Ok(tokens);
        }
    }
}