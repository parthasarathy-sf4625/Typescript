using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using APILibraryManagement.Data;
namespace APILibraryManagement.Controllers
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

        [HttpGet] //Get Details
        public IActionResult GetUserDetails()
        {
            return Ok(_dbContext.UserDetailsList.ToList());
        }

        [HttpGet("{userID}")] //GetDetails Individually
        public IActionResult GetIndividualUserDetails(int userID)
        {
            var userDetail = _dbContext.UserDetailsList.FirstOrDefault(userDetail => userDetail.UserID == userID);

            if(userDetail == null)
            {
                return NotFound();
            }
            return Ok(userDetail);
        }

        [HttpPost] //Add Details
        public IActionResult AddUserDetails([FromBody] UserDetails userDetail)
        {
            _dbContext.UserDetailsList.Add(userDetail);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{userID}")]//Update Details
        public IActionResult UpdateUserDetails(int userID,[FromBody] UserDetails userDetail)
        {
            var userDetailOld = _dbContext.UserDetailsList.FirstOrDefault(userDetail =>userDetail.UserID == userID);
            if(userDetailOld == null)
            {
                return NotFound();
            }
            userDetailOld.UserName = userDetail.UserName;
            userDetailOld.Email = userDetail.Email;
            userDetailOld.Password = userDetail.Password;
            userDetailOld.Department = userDetail.Department;
            userDetail.MobileNumber = userDetail.MobileNumber;
            userDetailOld.WalletBalance = userDetail.WalletBalance;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{userID}")]//Delete Details
        public IActionResult DeleteUserDetails(int userID)
        {
            var userDetail = _dbContext.UserDetailsList.FirstOrDefault(userDetail => userDetail.UserID == userID);
            if(userDetail == null)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}