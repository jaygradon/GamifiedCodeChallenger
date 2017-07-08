using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CodegleydAPI.Models;
using Microsoft.Extensions.Logging;

namespace CodegleydAPI.Controllers
{
    /// <summary>
    /// API Controller for accessing challenges.  Only supports code based challenges.
    /// </summary>
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ChallengeController : Controller
    {
        private readonly CodeChallengeContext _context;
        private readonly ILogger _logger;

        public ChallengeController(CodeChallengeContext context, ILogger<ChallengeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Gets a list of challenges, length equal to (end - start).
        /// </summary>
        /// <param name="start">Starting index of list, starts at 0.</param>
        /// <param name="end">Ending index of list.  May be longer than list length.</param>
        /// <returns>A list of challenges, from specified indices.</returns>
        [HttpGet]
        public IEnumerable<IChallenge> Get(int start, int end)
        {
            return _context.CodeChallenges.ToList().Skip(start).Take(end-start);
        }

        /// <summary>
        /// Gets a specific challenge based on ID.
        /// </summary>
        /// <param name="id">ID of challenge to get.</param>
        /// <returns>Ok with the challenge of the specified ID or NotFound.</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            IChallenge challenge = _context.CodeChallenges.FirstOrDefault(c => c.ID == id);
            if (challenge == null)
            {
                this._logger.LogWarning("Challenge with id {id} not found", id);
                return NotFound();
            }
            return new ObjectResult(challenge);
        }

        /// <summary>
        /// Adds a new challenge to the database.
        /// </summary>
        /// <param name="challenge">The challenge to add to the database.</param>
        /// <returns>Ok with the added challenge, or BadRequest.</returns>
        [HttpPost]
        public IActionResult Post([FromBody] CodeChallenge challenge)
        {
            try
            {
                _context.CodeChallenges.Add(challenge);
                _context.SaveChanges();
                this._logger.LogInformation("Adding challenge");
                return Ok(challenge);
            }
            catch (ArgumentNullException e)
            {
                this._logger.LogWarning("Malformed Challenge resulted in Null challenge");
                return BadRequest();
            }
        }

        /// <summary>
        /// Updates an existing challenge.
        /// </summary>
        /// <param name="id">ID of the challenge to update.</param>
        /// <param name="challenge">Updated challenge.</param>
        /// <returns>Ok with new challenge, or BadRequest.</returns>
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CodeChallenge challenge)
        {
            if (id == challenge.ID)
            {
                _context.CodeChallenges.Update(challenge);
                _context.SaveChanges();
                this._logger.LogInformation("Updating challenge");
                return Ok(challenge);
            }
            else
            {
                this._logger.LogWarning("ID and challenge ID do not match.");
                return BadRequest();
            }
            
        }
    }
}