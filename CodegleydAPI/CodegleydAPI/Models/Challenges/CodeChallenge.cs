using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    public class CodeChallenge : IChallenge
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
    }
}
