using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    /// <summary>
    /// Represents basic requirements for a test model.
    /// </summary>
    interface ITest
    {
        int ChallengeID { get; set; }
    }
}
