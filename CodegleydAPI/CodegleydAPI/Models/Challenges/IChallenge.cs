using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    /// <summary>
    /// Represents the basic requirements for a challenge question.
    /// </summary>
    public interface IChallenge
    {
        int ID { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string Difficulty { get; set; }
        string Category { get; set; }
    }
}
