using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;
using VNC.Framework.Commons;
using VNC.Framework.SecurityServices;
using VNC.Framework.SecurityServices.BCrypt;
using VNC.Infrastructure.Interfaces;

namespace VNC.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        private IConfiguration _config;

        public AuthenticationController(IAuthRepository authRepository, IConfiguration config)
        {
            _authRepository = authRepository;
            _config = config;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(LoginDto loginDto)
        {
            //var jwtToken = _authRepository.Login(loginDto, _config["Jwt:SigningSecret"], _config["Jwt:ExpiryDuration"]);
            var jwtToken = _authRepository.IsAuthenticated(loginDto, _config["Jwt:SigningSecret"], _config["Jwt:ExpiryDuration"]);

            if (jwtToken == null)
            {
                return Unauthorized();
            }

            return Ok(jwtToken);
        }
    }
}