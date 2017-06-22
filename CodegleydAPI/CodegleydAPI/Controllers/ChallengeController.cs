using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CodegleydAPI.Models;

namespace CodegleydAPI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ChallengeController : Controller
    {
        private readonly CodeChallengeContext _context;

        public ChallengeController(CodeChallengeContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public IEnumerable<IChallenge> Get(int start, int end)
        {
            return _context.CodeChallenges.ToList().Skip(start).Take(end-start);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            IChallenge challenge = _context.CodeChallenges.FirstOrDefault(c => c.ID == id);
            if (challenge == null)
            {
                return NotFound();
            }
            return new ObjectResult(challenge);
        }

        [HttpGet("test/{id}")]
        public IActionResult Test(int id)
        {
            Random rand = new Random();
            if (rand.Next(0, 2) == 0)
            {
                return Ok("{\"result\": \"pass\"}");
            }
            else
            {
                return Ok("{\"result\": \"fail\"}");
            }
        }

        [HttpPost("admin")]
        public void Post([FromBody] CodeChallenge challenge)
        {
            _context.CodeChallenges.Add(challenge);
            _context.SaveChanges();
        }

        [HttpPut("admin/{id}")]
        public IActionResult Put(int id, [FromBody] CodeChallenge challenge)
        {
            if (id == challenge.ID)
            {
                _context.CodeChallenges.Update(challenge);
                _context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
            
        }
    }
}