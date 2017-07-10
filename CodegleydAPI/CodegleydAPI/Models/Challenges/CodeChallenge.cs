using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    /// <summary>
    /// The requirements for a code based challenge question.
    /// </summary>
    public class CodeChallenge : IChallenge
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Difficulty { get; set; }
        public string Category { get; set; }
        public string Code { get; set; }
    }
}
