using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;
using VNC.Framework.Commons;
using VNC.Infrastructure.Interfaces;

namespace VNC.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;

        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet]
        [Route("AllRoles")]
        public IEnumerable<Role> RoleDetails()
        {
            IEnumerable<Role> lstRole = new List<Role>();
            lstRole = _roleRepository.RoleDetails();
            return lstRole;
        }

        [HttpGet]
        [Route("ListRoles")]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await _roleRepository.GetAllRoles());
        }

        [HttpGet]
        [Route("GetRoleDetail/{Id}")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _roleRepository.GetRoleById(id);

            if (user == null)
                return new NotFoundResult();

            return new ObjectResult(user);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> Post([FromBody]Role value)
        {
            try
            {
                value.CreatedDate = DateTime.Now;
                value.Deleted = false;
                await _roleRepository.Create(value);

                return new OkObjectResult(value);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPut]
        [Route("UpdateRole")]
        public async Task<IActionResult> PutRole(RoleViewModel roleviewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Role objRole = new Role();
                objRole = await _roleRepository.GetRoleById(roleviewModel.id);
                if (objRole != null)
                {
                    objRole.Name = roleviewModel.Name;
                    objRole.Description = roleviewModel.Description;
                    objRole.UpdatedDate = DateTime.Now;
                    objRole.UpdatedBy = "";
                }
                await _roleRepository.Update(objRole);

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(roleviewModel);
        }

        [HttpDelete]
        [Route("Delete/{Id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var roleModel = await _roleRepository.GetRoleById(id);

            if (roleModel == null)
                return new NotFoundResult();

            await _roleRepository.Delete(id);

            return new OkResult();
        }
    }
}