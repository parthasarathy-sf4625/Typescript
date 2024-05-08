using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace APIMetrocard.Data
{
    [Table("ticketDetails", Schema = "public")]
    public class TicketDetails
    {
        [Key]
        public int TicketID{get;set;}
        public string FromLocation{get;set;}
        public string ToLocation{get;set;}
        public double TicketPrice{get;set;}

    }
}