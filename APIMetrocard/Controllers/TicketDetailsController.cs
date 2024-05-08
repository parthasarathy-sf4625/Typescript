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
    public class TicketDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public TicketDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet] //Get Details
        public IActionResult GetTicketDetails()
        {
            return Ok(_dbContext.TicketDetailsList.ToList());
        }

        [HttpGet("{ticketID}")] //GetDetails Individually
        public IActionResult GetIndividualTicketDetails(int ticketID)
        {
            var ticketDetail = _dbContext.TicketDetailsList.FirstOrDefault(ticketDetail => ticketDetail.TicketID == ticketID);

            if (ticketDetail == null)
            {
                return NotFound();
            }
            return Ok(ticketDetail);
        }

        [HttpPost] //Add Details
        public IActionResult AddTicketDetails([FromBody] TicketDetails ticketDetail)
        {
            _dbContext.TicketDetailsList.Add(ticketDetail);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{ticketID}")]//Update Details
        public IActionResult UpdateTicketDetails(int ticketID, [FromBody] TicketDetails ticketDetail)
        {
            var ticketDetailOld = _dbContext.TicketDetailsList.FirstOrDefault(ticketDetail => ticketDetail.TicketID == ticketID);
            if (ticketDetailOld == null)
            {
                return NotFound();
            }
            ticketDetailOld.FromLocation = ticketDetail.FromLocation;
            ticketDetailOld.ToLocation = ticketDetail.ToLocation;
            ticketDetailOld.TicketPrice = ticketDetail.TicketPrice;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{ticketID}")]//Delete Details
        public IActionResult DeleteTicketDetails(int ticketID)
        {
            var ticketDetail = _dbContext.TicketDetailsList.FirstOrDefault(ticketDetail => ticketDetail.TicketID == ticketID);
            if (ticketDetail == null)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}