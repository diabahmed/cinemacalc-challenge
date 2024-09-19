using Microsoft.EntityFrameworkCore;
using CinemaCalcServer.Data;

namespace CinemaCalcServer.Services
{
    public static class MigrationService
    {
        public static void InitializeMigration(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<CinemaCalcDbContext>();
                context!.Database.Migrate();
            }
        }
    }
}
