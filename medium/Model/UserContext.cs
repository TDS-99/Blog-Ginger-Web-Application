using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace medium.Model
{
    public class UserContext : IdentityDbContext<Login>
    {
        public UserContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Blog> Blog { get; set; }
        public DbSet<Comment> Comment {get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Login>()
                .HasMany(b =>b.Blogs)
                .WithOne(u => u.User)
                .IsRequired();
            base.OnModelCreating(builder);
        }
    }
}
