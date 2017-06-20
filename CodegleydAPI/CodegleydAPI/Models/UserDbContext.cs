using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodegleydAPI.Models
{
   /**
    * Takes user information for storing in a database.
    */
   public class UserDbContext : IdentityDbContext<IdentityUser>
   {
      public UserDbContext(DbContextOptions<UserDbContext> options)
              : base(options)
      {
        Database.EnsureCreated();
      }
   }
}
