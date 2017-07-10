using CodegleydAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Utility
{
    public interface ITestRunner
    {
        TestResult RunTest(string code, string test);
    }
}
