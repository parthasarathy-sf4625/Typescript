using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace APIMedicalStore.Controllers;


[Route("api/[controller]")]
[ApiController]
public class OrderDetailsController : ControllerBase
{
    //Adding Default Data
    private readonly ApplicationDBContext _dbContext;
    public OrderDetailsController(ApplicationDBContext applicationDBContext)
    {
        _dbContext = applicationDBContext;
    }

    [HttpGet]
    //Get Details
    public IActionResult GetOrderDetails()
    {
        return Ok(_dbContext.orders.ToList());
    }
    //Set Details
    [HttpGet("{OrderID}")]
    public IActionResult GetIndividualOrderDetails(int orderID)
    {
        var order = _dbContext.orders.FirstOrDefault(order => order.OrderID == orderID);
        if (order == null)
        {
            return NotFound();
        }
        return Ok(order);
    }
    //Add Details
    [HttpPost]
    public IActionResult AddOrderDetails([FromBody] OrderDetails order)
    {
        _dbContext.orders.Add(order);
        _dbContext.SaveChanges();
        return Ok();
    }
    //Update Details
    [HttpPut("{OrderID}")]
    public IActionResult UpdateOrderDetails(int orderID, [FromBody] OrderDetails order)
    {
        var orderOld = _dbContext.orders.FirstOrDefault(order => order.OrderID == orderID);
        if (orderOld == null)
        {
            return NotFound();
        }
        orderOld.Quantity = order.Quantity;
        orderOld.OrderDate = order.OrderDate;
        orderOld.MedicineName = order.MedicineName;
        orderOld.TotalPrice = order.TotalPrice;
        _dbContext.SaveChanges();
        return Ok();
    }
    //Delete Details
    [HttpDelete("{OrderID}")]
    public IActionResult DeleteOrder(int orderID)
    {
        var order = _dbContext.orders.FirstOrDefault(order => order.OrderID == orderID);
        if (order == null)
        {
            return NotFound();
        }
        _dbContext.orders.Remove(order);
        _dbContext.SaveChanges();
        return Ok();
    }
}