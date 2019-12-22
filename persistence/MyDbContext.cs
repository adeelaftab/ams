using AppSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace AppSystem.persistence
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options):base(options)
        {
            
        }
        public DbSet<City> cities { get; set; }
        public DbSet<Country> countries { get; set; }
        public DbSet<Building> buildings { get; set; }
        public DbSet<Flat> flats { get; set; }
        public DbSet<FlatType> flatTypes { get; set; }
        public DbSet<Media> medias { get; set; }
        public DbSet<Nationality> nationalities { get; set; }
        public DbSet<Renter> renters { get; set; }
    }
}