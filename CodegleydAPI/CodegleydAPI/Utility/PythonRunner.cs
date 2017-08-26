using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodegleydAPI.Models;
using System.Diagnostics;
using System.IO;
using System.Collections;

namespace CodegleydAPI.Utility
{
    public class PythonRunner : ITestRunner
    {
        public TestResult RunTest(string code, string testSuite)
        {
            ProcessStartInfo start = new ProcessStartInfo();
            start.FileName = findPythonPath();
            start.Arguments = createTestFile(code, testSuite);
            start.UseShellExecute = false;
            start.CreateNoWindow = true;
            start.RedirectStandardOutput = true;
            start.RedirectStandardError = true;
            using (Process process = Process.Start(start))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    string err = process.StandardError.ReadToEnd();
                    return getResult(err);
                }
            }
        }

        /// <summary>
        /// Constructs a TestResult from Python unittest console output.
        /// </summary>
        /// <param name="s">The output of a Python unittest.</param>
        /// <returns>A TestResult with the outcome of the test.</returns>
        private TestResult getResult(string s)
        {
            string[] output = s.Split('\n');
            string result;
            if (output[output.Length - 2].StartsWith("OK"))
            {
                result = "PASS";
            }
            else
            {
                result = "FAIL";
            }

            return new TestResult(result);
        }

        /// <summary>
        /// Gets the filepath of the system python executable.
        /// </summary>
        /// <returns>The filepath of the system python executable.</returns>
        private string findPythonPath()
        {
            IDictionary environmentVariables = Environment.GetEnvironmentVariables();
            string pathVariable = environmentVariables["Path"] as string;
            if (pathVariable != null)
            {
                string[] allPaths = pathVariable.Split(';');
                foreach (var path in allPaths)
                {
                    string pythonPathFromEnv = path + "\\python.exe";
                    if (System.IO.File.Exists(pythonPathFromEnv))
                    {
                        return pythonPathFromEnv;
                    }
                }
            }
            return null;
        }

        /// <summary>
        /// Constructs a temporary test file with the passed code and test code.
        /// </summary>
        /// <param name="code">The code to be tested.</param>
        /// <param name="test">The python unittest code.</param>
        /// <returns>The filepath of the new test file.</returns>
        private string createTestFile(string code, string test)
        {
            string testFile = Path.GetTempPath() + "test.py";
            File.Delete(testFile);
            using (FileStream fileStream = new FileStream(testFile, FileMode.OpenOrCreate))
            {
                using (StreamWriter sw = new StreamWriter(fileStream))
                {
                    sw.Write(code + "\n\n" + test);
                }
            }
            return testFile;
        }
    }
}
