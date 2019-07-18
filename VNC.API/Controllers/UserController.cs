using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using VNC.Domain.Commons;
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
    public class UserController : ControllerBase
    {
      //  private ILoggerManager _logger;
        private readonly IUserRepository _userRepository;
        private IConfiguration _config;
        public UserController(IUserRepository userRepository, IConfiguration config)
        {
            _userRepository = userRepository;
            _config = config;
        }

        // GET: api/User
        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await _userRepository.GetAllUser());
        }

        // GET: api/User/Id
        [HttpGet]
        [Route("GetUserById/{Id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _userRepository.GetUserById(id);

            if (user == null)
                return new NotFoundResult();

            return new ObjectResult(user);
        }

        /// <summary>
		/// Get user Detail
		/// </summary>
		/// <param name="userId"></param>
		/// <returns></returns>
		[HttpGet]
        [Route("GetUserDetail/{userId}")]
        public async Task<IActionResult> GetUserDetail(string userId)
        {

            ResponseModel<UserDataTransformation> returnResponse = new ResponseModel<UserDataTransformation>();

            try
            {
                returnResponse = await _userRepository.GetUserDetail(userId);
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

        // GET: api/User/Id
        [HttpGet]
        [Route("GetUserId/{Id}")]
        public IActionResult GetUserId(string id)
        {
            User objUser = new User();
            try
            {
                objUser = _userRepository.GetUserId(id);
                if (objUser == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objUser);
        }

        // POST: api/User
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Post([FromBody]User value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                value.UserName = value.UserName;
                value.Password = SecurityBCryptMethod.CreatePasswordHash(value.Password);
                value.ExpiresIn = value.ExpiresIn;
                value.Gender = value.Gender;
                value.EmailAddress = value.EmailAddress;
                IPHostEntry heserver = Dns.GetHostEntry(Dns.GetHostName());
                var ipAddress = heserver.AddressList.ToList().Where(p => p.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork).FirstOrDefault().ToString();
                // get IP client
                value.IPAddress = ipAddress;// _accessor.HttpContext.Connection.RemoteIpAddress.ToString();
                value.LimitedTotal = value.LimitedTotal;
                value.InExuer = value.InExuer;
                value.Deleted = false;
                value.CreatedDate = DateTime.Now;
                await _userRepository.Create(value);

                return new OkObjectResult(value);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] DataTransformationUser userDataTransformation)
        {
            try
            {

                IPHostEntry heserver = Dns.GetHostEntry(Dns.GetHostName());
                var ipAddress = heserver.AddressList.ToList().Where(p => p.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork).FirstOrDefault().ToString();
                // get IP client
                userDataTransformation.IPAddress = ipAddress;// _accessor.HttpContext.Connection.RemoteIpAddress.ToString();

                // await _userRepository.CreateUser(userDataTransformation);
                //return new OkObjectResult(userDataTransformation);
                return await _userRepository.CreateUser(userDataTransformation).ContinueWith(x => new OkObjectResult(x.Id));

            }
            catch (Exception)
            {
                //throw ex;
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/User/5
        [HttpPut]
        [Route("ChangePassword")]
        public async Task<IActionResult> UpdatePassword([FromBody]UserChangePassword userpassword)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
               var userchange =  await _userRepository.ChangePassword(userpassword);
                if (userchange != null)
                    return Ok(userchange);
                else
                    return NotFound();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut]
        [Route("UpdateDetails")]
        public IActionResult PutUser(UserDataTransformation userViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                User objUser = new User();
                objUser = _userRepository.GetUserId(userViewModel.id);
                if (objUser != null)
                {
                    objUser.ExpiresIn = userViewModel.ExpiresIn;
                    objUser.EmailAddress = userViewModel.EmailAddress;
                    objUser.Gender = userViewModel.Gender;
                    objUser.InExuer = userViewModel.InExuer;
                    objUser.LimitedTotal = userViewModel.LimitedTotal;
                    objUser.UpdatedDate = DateTime.Now;
                    objUser.UpdatedBy = "";
                }
                _userRepository.Update(objUser);

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(userViewModel);
        }

        /// <summary>
        /// Get All Users
        /// </summary>
        /// <param name="userDataTransformation"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetAllUsers")]
        public async Task<IActionResult> UserInquiry([FromBody] UserInquiryDataTransformation userInquiryDataTransformation)
        {

            int pageSize = userInquiryDataTransformation.PageSize;
            int currentPageNumber = userInquiryDataTransformation.CurrentPageNumber;
            string sortDirection = userInquiryDataTransformation.SortDirection;
            string sortExpression = userInquiryDataTransformation.SortExpression;

            string userName = userInquiryDataTransformation.UserName;
            string emailAddress = userInquiryDataTransformation.EmailAddress;

            ResponseModel<List<UserDataTransformation>> returnResponse = new ResponseModel<List<UserDataTransformation>>();

            try
            {
                returnResponse = await _userRepository.GetAllUsers(userName, emailAddress, currentPageNumber, pageSize, sortExpression, sortDirection);
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

        // DELETE: api/Delete/5
        [HttpDelete]
        [Route("Delete/{Id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userModel = await _userRepository.GetUserById(id);

            if (userModel == null)
                return new NotFoundResult();

            await _userRepository.Delete(id);

            return new OkResult();
        }
    }
}