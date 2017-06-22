using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI
{
    /**
     * Stores JSON Web Token setting strings for use from appsettings.json.
     * Configure settings in appsettings.json
     */
    public class JWTSettings
    {
      public string SecretKey { get; set; }
      public string Issuer { get; set; }
      public string Audience { get; set; }
    }
}
