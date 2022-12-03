using OH_Assessment.Models;
using Microsoft.EntityFrameworkCore;

namespace OH_Assessment
{
    public class OrderContext : DbContext
    {
        public OrderContext(DbContextOptions<OrderContext> options) : base(options) {
            
        }

        public DbSet<Article> Articles { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>().ToTable("Article");
            modelBuilder.Entity<Order>().ToTable("Order");
        }
    }
}
