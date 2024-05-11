using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIGroceryStore.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIGroceryStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public OrderDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetOrderDetails()
        {
            return Ok(_dbContext.OrderDetailsList.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetIndividualOrderDetails(int id)
        {
            var orderDetail = _dbContext.OrderDetailsList.FirstOrDefault(orderDetail => orderDetail.OrderID == id);
            if (orderDetail == null)
            {
                return NotFound();
            }
            return Ok(orderDetail);
        }

        [HttpPost]
        public IActionResult AddOrderDetails(OrderDetails orderDetail)
        {
            _dbContext.OrderDetailsList.Add(orderDetail);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrderDetails(int id, OrderDetails orderDetail)
        {
            var orderDetailOld = _dbContext.OrderDetailsList.FirstOrDefault(orderDetail => orderDetail.OrderID == id);
            if (orderDetailOld == null)
            {
                return NotFound();
            }
            orderDetailOld.UserID = orderDetail.UserID;
            orderDetailOld.TotalPrice = orderDetail.TotalPrice;
            orderDetailOld.OrderDate = orderDetail.OrderDate;
            orderDetailOld.ProductDetails = orderDetail.ProductDetails;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}