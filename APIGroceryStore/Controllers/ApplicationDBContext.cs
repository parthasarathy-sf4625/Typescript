using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using APIGroceryStore.Data;

namespace APIGroceryStore.Controllers
{
    public class ApplicationDBContext : DbContext, IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<UserDetails> UserDetailsList { get; set; }
        public DbSet<ProductDetails> ProductDetailsList { get; set; }
        public DbSet<OrderDetails> OrderDetailsList { get; set; }

    }
}