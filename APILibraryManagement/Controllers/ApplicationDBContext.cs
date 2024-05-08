using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APILibraryManagement.Data;
using Microsoft.EntityFrameworkCore;

namespace APILibraryManagement.Controllers
{
    public class ApplicationDBContext :DbContext, IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
           AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<UserDetails> UserDetailsList {get;set;}
        public DbSet<BookDetails> BookDetailsList {get;set;}
        public DbSet<BorrowDetails> BorrowDetailsList {get;set;}
        
    }
}