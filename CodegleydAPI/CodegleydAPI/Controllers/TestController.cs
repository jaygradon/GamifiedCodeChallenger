using CodegleydAPI.Models;
using CodegleydAPI.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace CodegleydAPI.Controllers
{
    /// <summary>
    /// API controller for accessing and running tests.  Supports tests in Python.
    /// </summary>
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        private readonly CodeChallengeContext _challengeContext;
        private readonly TestContext _testContext;
        private readonly ILogger _logger;

        public TestController(CodeChallengeContext challengeContext, TestContext testContext, ILogger<TestController> logger)
        {
            _challengeContext = challengeContext;
            _testContext = testContext;
            _logger = logger;
        }

        /// <summary>
        /// Get a test by the test ID.
        /// </summary>
        /// <param name="id">The ID of the test.</param>
        /// <returns>OK with the test of the specified ID or NotFound,</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            ITest test = _testContext.ChallengeTests.FirstOrDefault(t => t.ID == id);
            if (test == null)
            {
                this._logger.LogWarning("Test with id {id} not found", id);
                return NotFound();
            }
            return new ObjectResult(test);
        }

        /// <summary>
        /// Get a test by the associated challenge ID.
        /// </summary>
        /// <param name="challengeID">The ID of the challenge associated with the test.</param>
        /// <returns>OK with the test of the specified challenge ID or NotFound.</returns>
        [HttpGet]
        public IActionResult GetByChallenge(int challengeID)
        {
            ITest test = _testContext.ChallengeTests.FirstOrDefault(t => t.ChallengeID == challengeID);
            if (test == null)
            {
                this._logger.LogWarning("Test with challengeID {id} not found", challengeID);
                return NotFound();
            }
            return new ObjectResult(test);
        }

        /// <summary>
        /// Runs the test with the specified challengeID.
        /// </summary>
        /// <param name="challengeID">The ID of the challenge to test.</param>
        /// <param name="challenge">The challenge to run the test on.</param>
        /// <returns>OK with the result of the test, or BadRequest.</returns>
        [HttpPost("run/{challengeID}")]
        public IActionResult Test(int challengeID, [FromBody] CodeChallenge challenge)
        {
            if (challengeID == challenge.ID)
            {
                Test test = _testContext.ChallengeTests.FirstOrDefault(t => challengeID == t.ChallengeID);
                if (test == null)
                {
                    return NotFound();
                }
                ITestRunner runner = new PythonRunner();
                _logger.LogInformation("Running tests...");
                TestResult result = runner.RunTest(challenge.Code, test.TestClass);
                return Ok(result);
            }
            this._logger.LogWarning("ChallengeID and the challenge ID do not match");
            return BadRequest();
        }

        /// <summary>
        /// Adds a new test to the database.
        /// </summary>
        /// <param name="test">The test to add to the database.</param>
        /// <returns>OK with the added test, or BadRequest.</returns>
        [HttpPost]
        public IActionResult Post([FromBody] Test test)
        {
            if (_challengeContext.CodeChallenges.Any(c => test.ChallengeID == c.ID)) {
                if(_testContext.ChallengeTests.Any(t => test.ChallengeID == t.ChallengeID))
                {
                    this._logger.LogWarning("A test already exists for that challenge");
                    return BadRequest();
                }
                _testContext.ChallengeTests.Add(test);
                _testContext.SaveChanges();
                this._logger.LogInformation("Adding test");
                return Ok(test);
            }
            this._logger.LogWarning("Specified challenge did not exist");
            return BadRequest();
        }

        /// <summary>
        /// Updates an existing test.
        /// </summary>
        /// <param name="id">The id of the test to update.</param>
        /// <param name="test">The updated test.</param>
        /// <returns>OK with the updated test or BadRequest.</returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Test test)
        {
            if (id == test.ID)
            {
                if (_challengeContext.CodeChallenges.Any(c => test.ChallengeID == c.ID))
                {
                    if (_testContext.ChallengeTests.Any(t => id == t.ChallengeID && t.ID != test.ID))
                    {
                        this._logger.LogWarning("Another test already exists for that challenge");
                        return BadRequest();
                    }
                    _testContext.ChallengeTests.Add(test);
                    _testContext.SaveChanges();
                    this._logger.LogInformation("Updating test");
                    return Ok(test);
                }
                this._logger.LogWarning("Specified challenge did not exist");
                return BadRequest();
            }
            this._logger.LogWarning("ID and test ID do not match");
            return BadRequest();
        }
    }
}