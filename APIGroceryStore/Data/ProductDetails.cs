using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIGroceryStore.Data
{
    [Table("productDetails", Schema="public")]
    public class ProductDetails
    {
        [Key]
        public int ProductID{get;set;}
        public string ProductName{get;set;}
        public int Quantity{get;set;}
        public double Price{get;set;}
        public DateTime PurchaseDate{get;set;}
        public DateTime ExpiryDate{get;set;}
        public string[] ProductPic{get;set;}
    }
}