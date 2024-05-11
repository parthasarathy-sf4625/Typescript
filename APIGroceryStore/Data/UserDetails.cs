using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace APIGroceryStore.Data
{
    [Table("userDetails", Schema="public")]
    public class UserDetails
    {
        [Key]
        public int UserID{get;set;}
        public string UserName{get;set;}
        public string Email{get;set;}
        public string Password{get;set;}
        public double Balance{get;set;}
        public string[] UserPic{get;set;}
    }
}