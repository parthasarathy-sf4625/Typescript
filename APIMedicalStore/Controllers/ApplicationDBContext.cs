
using APIMedicalStore;
using Microsoft.EntityFrameworkCore;

namespace APIMedicalStore.Controllers;


public class ApplicationDBContext : DbContext, IDisposable
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public DbSet<UserInfo> users {get;set;}
    public DbSet<MedicineInfo> medicines{get;set;}
    public DbSet<OrderDetails> orders{get;set;}
}