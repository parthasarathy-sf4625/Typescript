using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIMetrocard.Data
{
    [Table("travelDetails", Schema = "public")]
    public class TravelDetails
    {
        [Key]
        public int TravelID{get;set;}
        public int CardNumber{get;set;}
        public string FromLocation{get;set;}
        public string ToLocation{get;set;}
        public string TravelDate{get;set;}

        public double TravelPrice{get;set;}
    }
}