using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    public interface IChallenge
    {
        int ID { get; set; }
        string Title { get; set; }
        string Description { get; set; }
    }
}
