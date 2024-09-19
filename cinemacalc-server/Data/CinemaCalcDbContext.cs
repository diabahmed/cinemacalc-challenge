using CinemaCalcServer.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaCalcServer.Data
{
    public class CinemaCalcDbContext : DbContext
    {
        public CinemaCalcDbContext(DbContextOptions<CinemaCalcDbContext> options) : base(options)
        {
        }

        public DbSet<Expense> Expenses { get; set; }
    }
}
