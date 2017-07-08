using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    /// <summary>
    /// The requirements for a code based test class.
    /// </summary>
    public class Test : ITest
    {
        public int ID { get; set; }
        public int ChallengeID { get; set; }
        public string TestClass { get; set; }
    }
}
