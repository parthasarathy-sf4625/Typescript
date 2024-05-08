using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace APIMedicalStore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserInfoController : ControllerBase
{
    private readonly ApplicationDBContext _dbContext;

    public UserInfoController(ApplicationDBContext applicationDBContext)
    {
        _dbContext = applicationDBContext;
    }

    [HttpGet]
    //Get Details
    public IActionResult GetUserDetails()
    {
        return Ok(_dbContext.users.ToList());
    }
    //Set Details
    [HttpGet("{UserID}")]
    public IActionResult GetIndividualUserDetails(int userID)
    {
        var user = _dbContext.users.FirstOrDefault(user => user.UserID == userID);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }
    //Add Details
    [HttpPost]
    public IActionResult AddserDetails([FromBody] UserInfo user)
    {
        _dbContext.users.Add(user);
        _dbContext.SaveChanges();
        return Ok();
    }
    //Update Details
    [HttpPut("{userID}")]
    public IActionResult UpdateUserDetails(int userID, [FromBody] UserInfo user)
    {
        var userOld = _dbContext.users.FirstOrDefault(user => user.UserID == userID);
        if (userOld == null)
        {
            return NotFound();
        }
        userOld.UserName = user.UserName;
        userOld.UserEmail = user.UserEmail;
        userOld.UserPassword = user.UserPassword;
        userOld.Balance = user.Balance;
        _dbContext.SaveChanges();
        return Ok();
    }
    //Delete Details
    [HttpDelete("{userID}")]
    public IActionResult DeleteUser(int userID)
    {
        var user = _dbContext.users.FirstOrDefault(user => user.UserID == userID);
        if (user == null)
        {
            return NotFound();
        }
        _dbContext.users.Remove(user);
        _dbContext.SaveChanges();
        return Ok();
    }
}
