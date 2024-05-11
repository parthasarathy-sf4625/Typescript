using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using APIGroceryStore.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIGroceryStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet] 
        public IActionResult GetUserDetails()
        {
            return Ok(_dbContext.UserDetailsList.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetIndividualUserDetails(int id)
        {
            var userDetail = _dbContext.UserDetailsList.FirstOrDefault(userDetail => userDetail.UserID == id);
            if(userDetail == null)
            {
                return NotFound();
            }
            return Ok(userDetail);
        }

        [HttpPost]
        public IActionResult AddUserDetails(UserDetails userDetail)
        {
            _dbContext.UserDetailsList.Add(userDetail);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUserDetails(int id,UserDetails userDetail)
        {
            var userDetailOld = _dbContext.UserDetailsList.FirstOrDefault(userDetailOld =>userDetailOld.UserID == id);
            if(userDetailOld == null)
            {
                return NotFound();
            }
             userDetailOld.UserName = userDetail.UserName;
             userDetailOld.Email = userDetail.Email;
             userDetailOld.Password =userDetail.Password;
             userDetailOld.Balance = userDetail.Balance;
             _dbContext.SaveChanges();
             return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUserDetails(int id)
        {
            var UserDetail = _dbContext.UserDetailsList.FirstOrDefault(UserDetail =>UserDetail.UserID == id);
            if(UserDetail == null)
            {
                return NotFound();
            }

            _dbContext.UserDetailsList.Remove(UserDetail);
            return Ok();
        }
    }
}