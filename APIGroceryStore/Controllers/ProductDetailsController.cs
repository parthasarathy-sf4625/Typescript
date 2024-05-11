using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using APIGroceryStore.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIGroceryStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductDetailsController:ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;

        public ProductDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult GetProductDetails()
        {
            return Ok(_dbContext.ProductDetailsList.ToList());
        }

        [HttpGet("{id}")] 
        public IActionResult GetIndividualProductDetails(int id)
        {
            var productDetail = _dbContext.ProductDetailsList.FirstOrDefault(productDetail => productDetail.ProductID == id);
            if(productDetail == null)
            {
                return NotFound();
            }
            return Ok(productDetail);
        }

        [HttpPost]
        public IActionResult AddProductDetails(ProductDetails productDetail)
        {
            _dbContext.ProductDetailsList.Add(productDetail);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProductDetails(int id,ProductDetails productDetail)
        {
            var productDetailOld = _dbContext.ProductDetailsList.FirstOrDefault(productDetailOld =>productDetailOld.ProductID == id);
            if(productDetailOld == null)
            {
                return NotFound();
            }
            productDetailOld.ProductName = productDetail.ProductName;
            productDetailOld.Quantity = productDetail.Quantity;
            productDetailOld.Price = productDetail.Price;
            productDetailOld.PurchaseDate = productDetail.PurchaseDate;
            productDetailOld.ExpiryDate = productDetail.ExpiryDate;
            _dbContext.SaveChanges();
            return Ok();
            
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProductDetails(int id)
        {
            var ProductDetail = _dbContext.ProductDetailsList.FirstOrDefault(ProductDetail =>ProductDetail.ProductID == id);
            if(ProductDetail == null)
            {
                return NotFound();
            }

            _dbContext.ProductDetailsList.Remove(ProductDetail);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}