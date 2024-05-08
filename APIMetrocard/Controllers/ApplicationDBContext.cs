using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using APIMetrocard.Data;

namespace APIMetrocard.Controllers
{
    public class ApplicationDBContext : DbContext, IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<PersonalDetails> PersonalDetailsList { get; set; }
        public DbSet<TravelDetails> TravelDetailsList { get; set; }
        public DbSet<TicketDetails> TicketDetailsList { get; set; }

    }
}