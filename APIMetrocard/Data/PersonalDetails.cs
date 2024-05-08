using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIMetrocard.Data
{
    [Table("personalDetails", Schema = "public")]
    public class PersonalDetails
    {
        [Key]
        public int CardNumber{get;set;}
        public string UserName{get;set;}
        public string Email{get;set;}
        public string Phone{get;set;}
        public string Password{get;set;}
        public double WalletBalance{get;set;}
    }
}