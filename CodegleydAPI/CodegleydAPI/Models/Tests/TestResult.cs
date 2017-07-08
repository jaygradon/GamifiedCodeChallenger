using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    /// <summary>
    /// Stores results of a test.
    /// </summary>
    public class TestResult
    {
        /// <summary>
        /// PASS or FAIL
        /// </summary>
        public string Result { get; set; }

        /// <summary>
        /// Number of tests run
        /// </summary>
        public int Tests { get; set; }

        /// <summary>
        /// Number of successful tests
        /// </summary>
        public int Successes { get; set; }

        public TestResult(string result)
        {
            this.Result = result;
            this.Tests = -1;
            this.Successes = -1;
        }
    }
}
