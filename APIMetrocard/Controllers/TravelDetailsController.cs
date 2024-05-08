using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIMetrocard.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIMetrocard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public TravelDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet] //Get Details
        public IActionResult GetTravelDetails()
        {
            return Ok(_dbContext.TravelDetailsList.ToList());
        }

        [HttpGet("{travelID}")] //GetDetails Individually
        public IActionResult GetIndividualTicketDetails(int travelID)
        {
            var travelDetail = _dbContext.TravelDetailsList.FirstOrDefault(travelDetail => travelDetail.TravelID == travelID);
            if(travelDetail == null)
            {
                return NotFound();
            }
            return Ok(travelDetail);
        }

        [HttpPost] //Add Details
        public IActionResult AddTravelDetails([FromBody] TravelDetails travelDetail)
        {
            _dbContext.TravelDetailsList.Add(travelDetail);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{travelID}")] //Update Details
        public IActionResult UpdateTravelDetails(int travelID ,[FromBody] TravelDetails ticketDetail)
        {
            var travelDetailOld = _dbContext.TravelDetailsList.FirstOrDefault(travelDetailOld => travelDetailOld.TravelID == travelID);
            if(travelDetailOld == null)
            {
                return NotFound();
            }
            travelDetailOld.CardNumber = ticketDetail.CardNumber;
            travelDetailOld.FromLocation = ticketDetail.FromLocation;
            travelDetailOld.ToLocation = ticketDetail.ToLocation;
            travelDetailOld.TravelDate = ticketDetail.TravelDate;
            travelDetailOld.TravelPrice = ticketDetail.TravelPrice;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{travelID}")] //Delete Details
        public IActionResult DeleteTravelDetails(int travelID)
        {
            var travelDetail = _dbContext.TravelDetailsList.FirstOrDefault(travelDetail => travelDetail.TravelID == travelID);
            if(travelDetail == null)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}