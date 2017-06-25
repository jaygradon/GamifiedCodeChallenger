using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    public class CodeChallengeContext : DbContext
    {
        public CodeChallengeContext(DbContextOptions<CodeChallengeContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<CodeChallenge> CodeChallenges { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CodeChallenge>().ToTable("CodeChallenges");
        }
    }
}
