using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodegleydAPI.Models
{
   public class UserDbContext : IdentityDbContext<IdentityUser>
   {
      public UserDbContext(DbContextOptions<UserDbContext> options)
              : base(options)
      {
        Database.EnsureCreated();
      }
   }
}
