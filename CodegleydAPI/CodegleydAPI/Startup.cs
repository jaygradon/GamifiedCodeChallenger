using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using CodegleydAPI.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CodegleydAPI
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

    /**
     * This method gets called by the runtime. Use this method to add services to the container.
     */
    public void ConfigureServices(IServiceCollection services)
        {
            // Use local SQL databases (see appsettings.json to configure)
            services.AddDbContext<UserDbContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("CodegleydUserDb")));
            services.AddDbContext<CodeChallengeContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("CodegleydCodeChallengeDb"))); 

            // Using JWT authorisation identities
            services.AddIdentity<IdentityUser, IdentityRole>()
                          .AddEntityFrameworkStores<UserDbContext>();
            services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));

            services.Configure<IdentityOptions>(options =>
            {
              // avoid redirecting REST clients on 401
              options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
              {
                OnRedirectToLogin = ctx =>
                {
                  ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                  return Task.FromResult(0);
                }
              };
            });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseIdentity();
            
            // Create Validation Parameters
            // secretKey contains a secret passphrase only your server knows
            var secretKey = Configuration.GetSection("JWTSettings:SecretKey").Value;
            var issuer = Configuration.GetSection("JWTSettings:Issuer").Value;
            var audience = Configuration.GetSection("JWTSettings:Audience").Value;
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
            var tokenValidationParameters = new TokenValidationParameters
            {
              ValidateIssuerSigningKey = true,
              IssuerSigningKey = signingKey,

              // Validate the JWT Issuer (iss) claim
              ValidateIssuer = true,
              ValidIssuer = issuer,

              // Validate the JWT Audience (aud) claim
              ValidateAudience = true,
              ValidAudience = audience
            };

            // Check incoming tokens against validation parameters
            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
              TokenValidationParameters = tokenValidationParameters
            });

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
              AutomaticAuthenticate = false,
              AutomaticChallenge = false
            });

            app.UseMvc();
        }
    }
}
