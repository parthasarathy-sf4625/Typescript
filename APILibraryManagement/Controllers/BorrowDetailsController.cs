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
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet] //Get Details
        public IActionResult GetBorrowDetails()
        {
            return Ok(_dbContext.BorrowDetailsList.ToList());
        }

        [HttpGet("{borrowID}")] //GetDetails Individually
        public IActionResult GetIndividualBorrowDetails(int borrowID)
        {
            var borrowDetail = _dbContext.BorrowDetailsList.FirstOrDefault(borrowDetail => borrowDetail.BorrowID == borrowID);

            if (borrowDetail == null)
            {
                return NotFound();
            }
            return Ok(borrowDetail);
        }

        [HttpPost] //Add Details
        public IActionResult AddBorrowDetails([FromBody] BorrowDetails borrowDetail)
        {
            _dbContext.BorrowDetailsList.Add(borrowDetail);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{borrowID}")]//Update Details
        public IActionResult UpdateBorrowDetails(int borrowID, [FromBody] BorrowDetails borrowDetail)
        {
            var borrowDetailOld = _dbContext.BorrowDetailsList.FirstOrDefault(borrowDetail => borrowDetail.BorrowID == borrowID);
            if (borrowDetailOld == null)
            {
                return NotFound();
            }
            borrowDetailOld.BookID = borrowDetail.BookID;
            borrowDetailOld.UserID = borrowDetail.UserID;
            borrowDetailOld.BorrowDate = borrowDetail.BorrowDate;
            borrowDetailOld.BorrowBookCount = borrowDetail.BorrowBookCount;
            borrowDetailOld.Status = borrowDetail.Status;
            borrowDetailOld.PaidFineAmount = borrowDetail.PaidFineAmount;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{borrowID}")]//Delete Details
        public IActionResult DeleteBorrowDetails(int borrowID)
        {
            var borrowDetail = _dbContext.BorrowDetailsList.FirstOrDefault(borrowDetail => borrowDetail.BorrowID == borrowID);
            if (borrowDetail == null)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}