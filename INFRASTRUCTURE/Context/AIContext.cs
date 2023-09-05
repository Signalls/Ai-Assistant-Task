using DOMAIN.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UserProfileData.Domain;

namespace UserProfileData.Context
{
    public class AIContext : IdentityDbContext<UserProfile>
    {
        public DbSet<Topic> Topics { get; set; }
        public DbSet<Question> Question { get; set; }

        public AIContext(DbContextOptions<AIContext> Options) : base(Options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Modify the data type for ConcurrencyStamp to TEXT
            builder.Entity<IdentityRole>().Property(r => r.ConcurrencyStamp).HasColumnType("TEXT");
            builder.Entity<IdentityUser>().Property(u => u.ConcurrencyStamp).HasColumnType("TEXT");


            builder.Entity<IdentityRole>().Property(r => r.ConcurrencyStamp)
            .HasColumnType("TEXT").HasMaxLength(255); // Adjust the length as needed
            builder.Entity<IdentityUser>().Property(u => u.ConcurrencyStamp)
                .HasColumnType("TEXT").HasMaxLength(255); // Adjust the length as needed



        }


    }
}
