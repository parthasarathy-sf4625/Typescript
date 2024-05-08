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
    public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet] //Get Details
        public IActionResult GetBookDetails()
        {
            return Ok(_dbContext.BookDetailsList.ToList());
        }

        [HttpGet("{bookID}")] //GetDetails Individually
        public IActionResult GetIndividualBookDetails(int bookID)
        {
            var bookDetail = _dbContext.BookDetailsList.FirstOrDefault(bookDetail => bookDetail.BookID == bookID);

            if (bookDetail == null)
            {
                return NotFound();
            }
            return Ok(bookDetail);
        }

        [HttpPost] //Add Details
        public IActionResult AddBookDetails([FromBody] BookDetails bookDetail)
        {
            _dbContext.BookDetailsList.Add(bookDetail);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{bookID}")]//Update Details
        public IActionResult UpdateBookDetails(int bookID, [FromBody] BookDetails bookDetail)
        {
            var bookDetailOld = _dbContext.BookDetailsList.FirstOrDefault(bookDetail => bookDetail.BookID == bookID);
            if (bookDetailOld == null)
            {
                return NotFound();
            }
            bookDetailOld.BookName = bookDetail.BookName;
            bookDetailOld.BookCount = bookDetail.BookCount;
            bookDetailOld.AuthorName = bookDetail.AuthorName;
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpDelete("{bookID}")]//Delete Details
        public IActionResult DeleteBookDetails(int bookID)
        {
            var bookDetail = _dbContext.BookDetailsList.FirstOrDefault(bookDetail => bookDetail.BookID == bookID);
            if (bookDetail == null)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}