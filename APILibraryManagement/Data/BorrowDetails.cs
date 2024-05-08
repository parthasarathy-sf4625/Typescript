using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace APILibraryManagement.Data
{

    [Table("borrowDetails", Schema = "public")]
    public class BorrowDetails
    {
        [Key]
        public int BorrowID{get;set;}
        public int BookID{get;set;}
        public int UserID{get;set;}
        public DateTime BorrowDate{get;set;}
        public int BorrowBookCount{get;set;}
        public string Status {get;set;}
        public int PaidFineAmount{get;set;}
    }
}