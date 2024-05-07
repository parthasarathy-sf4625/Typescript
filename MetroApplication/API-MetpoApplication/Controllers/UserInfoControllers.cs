
using API_MetpoApplication;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
namespace MetroCardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UserController:ControllerBase
    {
        private static List<UserInfo> _Users=new List<UserInfo>
        {
            new UserInfo{CardNumber=1001,UserName="Bruce",Password="brucez@11",PhoneNumber="9876543210",Balance=0},
            new UserInfo{CardNumber=1002,UserName="Clark",Password="Clark@13e",PhoneNumber="9876123450",Balance=0}
        };

        [HttpGet]
        public IActionResult GetUser()
        {
            return Ok(_Users);
        }
        [HttpGet("{id}")]
        public IActionResult GetUserDetails(int id)
        {
            var user=_Users.Find(m=>m.CardNumber==id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPost]
        public IActionResult PostUserDetails([FromBody]UserInfo user)
        {
            _Users.Add(user);
            return Ok();
        }
        [HttpPut("{id}")]
        public IActionResult PutUserDetails(int id, [FromBody]UserInfo user)
        {
            var index=_Users.FindIndex(m=>m.CardNumber==id);
            if(index<0)
            {
                return NotFound();
            }
            _Users[index]=user;
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteUserDetails(int id)
        {
            var user=_Users.Find(m=>m.CardNumber==id);
            if(user==null)
            {
                return NotFound();
            }
            _Users.Remove(user);
            return Ok();
        }
    }
}

