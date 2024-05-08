using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIMetrocard.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace APIMetrocard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalDetailsController :ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public PersonalDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet] //Get Details
        public IActionResult GetPersonalDetails()
        {
            return Ok(_dbContext.PersonalDetailsList.ToList());
        }

        [HttpGet("{cardNumber}")] //GetDetails Individually
        public IActionResult GetIndividualPersonalDetails(int cardNumber)
        {
            var personalDetail = _dbContext.PersonalDetailsList.FirstOrDefault(personalDetail => personalDetail.CardNumber == cardNumber);

            if(personalDetail == null)
            {
                return NotFound();
            }
            return Ok(personalDetail);
        }

        [HttpPost] //Add Details
        public IActionResult AddPersonalDetails([FromBody] PersonalDetails personalDetail)
        {
            _dbContext.PersonalDetailsList.Add(personalDetail);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{cardNumber}")]//Update Details
        public IActionResult UpdatePersonalDetails(int cardNumber,[FromBody] PersonalDetails personalDetail)
        {
            var personalDetailOld = _dbContext.PersonalDetailsList.FirstOrDefault(personalDetail =>personalDetail.CardNumber == cardNumber);
            if(personalDetailOld == null)
            {
                return NotFound();
            }
            personalDetailOld.UserName = personalDetail.UserName;
            personalDetailOld.Phone = personalDetail.Phone;
            personalDetailOld.Password = personalDetail.Password;
            personalDetailOld.WalletBalance = personalDetail.WalletBalance;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{cardNumber}")]//Delete Details
        public IActionResult DeletePersonalDetails(int cardNumber)
        {
            var personalDetail = _dbContext.PersonalDetailsList.FirstOrDefault(personalDetail => personalDetail.CardNumber == cardNumber);
            if(personalDetail == null)
            {
                return NotFound();
            }
            return Ok();
        }

    }
}