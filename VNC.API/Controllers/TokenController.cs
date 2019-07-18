using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VNC.Domain.Commons;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;
using VNC.Framework.Commons;
using VNC.Infrastructure.Interfaces;

namespace VNC.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenRepository _tokenRepository;
        public TokenController(ITokenRepository tokenRepository)
        {
            _tokenRepository = tokenRepository;
        }

        // GET: api/Token
        [HttpGet]
        [Route("GetTokens")]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await _tokenRepository.GetAllTokens());
        }

        [HttpGet]
        [Route("GetTokenUser")]
        public async Task<IActionResult> GetUserToken()
        {
            return new ObjectResult(await _tokenRepository.GetAllUserTokens());
        }

        // GET: api/Token/Id
        [HttpGet]
        [Route("GetTokenDetail/{Id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _tokenRepository.GetTokenById(id);

            if (user == null)
                return new NotFoundResult();

            return new ObjectResult(user);
        }

        /// <summary>
		/// Get Token by UserId
		/// </summary>
		/// <returns></returns>
		[HttpGet]
        [Route("GetTokenByUser")]
        public async Task<IActionResult> GetTokens()
        {
            ResponseModel<List<TokenViewModel>> returnResponse = new ResponseModel<List<TokenViewModel>>();

            try
            {
                returnResponse = await _tokenRepository.GetTokenByUser();
                if (returnResponse.ReturnStatus == false)
                {
                    return BadRequest(returnResponse);
                }

                return Ok(returnResponse);

            }
            catch (Exception ex)
            {
                returnResponse.ReturnStatus = false;
                returnResponse.ReturnMessage.Add(ex.Message);
                return BadRequest(returnResponse);
            }

        }

        // POST: api/Token
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]TokenViewModel value)
        {
            try
            {
                var token = new Token();
                token.UserId = ObjectExtensions.GetInternalId("5d243edeafdca627242610c3");//Todo: get Uer
                token.TokenKey = value.TokenKey;//create token username+password...
                token.CreatedDate = DateTime.Now;
                token.CreatedBy = "trieulq";
                await _tokenRepository.Create(token);

                return new OkObjectResult(value);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // PUT: api/Token/5
        [HttpPut]
        [Route("Update/{Id}")]
        public async Task<IActionResult> Put(string id, [FromBody]TokenViewModel value)
        {
            var token = new Token();
            token.Id = ObjectExtensions.GetInternalId(id);
            token.TokenKey = value.TokenKey;
            token.UpdatedDate = DateTime.Now;

            await _tokenRepository.Update(token);

            return new OkObjectResult(value);
        }

        // DELETE: api/Delete/5
        [HttpDelete]
        [Route("Delete/{Id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userModel = await _tokenRepository.GetTokenById(id);

            if (userModel == null)
                return new NotFoundResult();

            await _tokenRepository.Delete(id);

            return new OkResult();
        }
    }
}