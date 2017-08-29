using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using CodegleydAPI.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CodegleydAPI.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/UserData")]
    public class UserDataController : Controller
    {
        private readonly UserDbContext _userContext;
        private readonly UserDataContext _dataContext;
        private readonly ILogger _logger;

        public UserDataController(UserDbContext userContext, UserDataContext dataContext, ILogger<UserDataController> logger)
        {
            _userContext = userContext;
            _dataContext = dataContext;
            _logger = logger;
        }
        
        /// <summary>
        /// Gets the data for a user, including gold and tiles.
        /// </summary>
        /// <param name="userID">The id of the owning user</param>
        /// <returns>Ok with the data, or NotFound</returns>
        [HttpGet("sim/{userID}")]
        public IActionResult GetAll(string userID)
        {

            UserData data = _dataContext.UserData.FirstOrDefault(d => d.UserId == userID);

            List<SimulationValue> simValues = _dataContext.SimulationValues.Include("Tile").Where(s => s.UserDataID == data.ID).ToList();
            data.SimValues = simValues;

            if (data == null)
            {
                this._logger.LogWarning("Data with user id {id} not found", userID);
                return NotFound();
            }

            return Ok(data);
        }

        /// <summary>
        /// Gets the data for a user, including gold and tiles.
        /// </summary>
        /// <param name="userID">The id of the owning user</param>
        /// <returns>Ok with the data, or NotFound</returns>
        [HttpGet("sim/id/{dataID}")]
        public IActionResult GetData(int dataID)
        {
            UserData data = _dataContext.UserData.FirstOrDefault(d => d.ID == dataID);
            if(dataID == 0)
            {
                data = _dataContext.UserData.ToArray()[_dataContext.UserData.ToArray().Length-1];
            }
            if (data == null)
            {
                data = _dataContext.UserData.ToArray()[0];
            }

            List<SimulationValue> simValues = _dataContext.SimulationValues.Include("Tile").Where(s => s.UserDataID == data.ID).ToList();
            data.SimValues = simValues;

            return Ok(data);
        }

        /// <summary>
        /// Gets the data for a user, excluding tiles.
        /// </summary>
        /// <param name="userID">The id of the owning user</param>
        /// <returns>Ok with the data, or NotFound</returns>
        [HttpGet("{userID}")]
        public IActionResult Get(string userID)
        {

            UserData data = _dataContext.UserData.FirstOrDefault(d => d.UserId == userID);

            if (data == null)
            {
                this._logger.LogWarning("Data with user id {id} not found", userID);
                return NotFound();
            }

            return Ok(data);
        }

        /// <summary>
        /// Creates initial data for a user.
        /// </summary>
        /// <param name="userID">The id of the owning user</param>
        /// <returns>Ok with new data, NotFound or BadRequest</returns>
        [HttpPost("{userID}")]
        public IActionResult Post(string userID, string displayName)
        {
            IdentityUser user = _userContext.Users.FirstOrDefault(u => u.Id == userID);
            if (user == null)
            {
                this._logger.LogWarning("User with user id {id} not found", userID);
                return NotFound();
            }

            UserData data = _dataContext.UserData.FirstOrDefault(d => d.UserId == userID);
            if (data != null)
            {
                this._logger.LogWarning("Data for user id {id} already exists", userID);
                return BadRequest();
            }

            data = new UserData(userID, displayName);
            _dataContext.Add(data);
            _dataContext.SaveChanges();
            this._logger.LogInformation("Creating user data");

            return Ok(data);
        }

        /// <summary>
        /// Updates the amount of gold (total) a user has.
        /// </summary>
        /// <param name="userID">The id of the owning user</param>
        /// <param name="gold">The gold to add to the user's total</param>
        /// <returns>Ok with the updated data or NotFound</returns>
        [HttpPut("gold/{userID}")]
        public IActionResult AddGold(string userID, int gold)
        {
            UserData data = _dataContext.UserData.FirstOrDefault(d => d.UserId == userID);
            if (data == null)
            {
                this._logger.LogWarning("Data with user id {id} not found", userID);
                return NotFound();
            }

            data.Gold += gold;
            _dataContext.Update(data);
            _dataContext.SaveChanges();

            this._logger.LogInformation("Updating user data");
            return Ok(data);
        }

        [HttpPut("initsim/{userID}")]
        public IActionResult InitSim(string userID, [FromBody] UserData data)
        {
            if (data == null)
            {
                _logger.LogWarning("Data is null, provided data may be malformed");
                return BadRequest();
            }

            if (data.UserId != userID)
            {
                _logger.LogWarning("Data user and user ID {id} do not match", userID);
                return BadRequest();
            }

            UserData existingData = _dataContext.UserData.FirstOrDefault(d => d.UserId == userID);
            if (existingData == null)
            {
                _logger.LogWarning("Data for user ID {id} not found, post first", userID);
                return NotFound();
            }

            if (existingData.ID != data.ID)
            {
                _logger.LogWarning("Given data does not match existing data for user ID {id}", userID);
                return BadRequest();
            }

            existingData.Gold = data.Gold;
            existingData.GoldSpent = data.GoldSpent;
            existingData.SimValues = data.SimValues;
            existingData.SerializeStorage = data.SerializeStorage;

            _dataContext.UserData.Update(existingData);
            _dataContext.SaveChanges();
            _logger.LogInformation("Updating data");
            return Ok(data);
        }

        [HttpPut("{userID}")]
        public IActionResult Put(string userID,[FromBody] UserData data)
        {
            if (data == null)
            {
                _logger.LogWarning("Data is null, provided data may be malformed");
                return BadRequest();
            }

            if (data.UserId != userID)
            {
                _logger.LogWarning("Data user and user ID {id} do not match", userID);
                return BadRequest();
            }

            UserData existingData = _dataContext.UserData.FirstOrDefault(d => d.UserId == userID);
            if (existingData == null)
            {
                _logger.LogWarning("Data for user ID {id} not found, post first", userID);
                return NotFound();
            }

            if (existingData.ID != data.ID)
            {
                _logger.LogWarning("Given data does not match existing data for user ID {id}", userID);
                return BadRequest();
            }

            existingData.Gold = data.Gold;
            existingData.GoldSpent = data.GoldSpent;

            try
            {
                _dataContext.UserData.Update(existingData);
                _dataContext.SaveChanges();
                _logger.LogInformation("Updating data");
                return Ok(data);
            } catch(Exception e)
            {
                _logger.LogWarning("Concurrency issue");
                return Ok();
            }
        }

        [HttpPut("serial/{userID}")]
        public IActionResult PutUserSerial(string userID, string serial)
        {
            UserData data = _dataContext.UserData.FirstOrDefault(d => d.UserId == userID);
            if (data == null)
            {
                _logger.LogWarning("Data for user ID {id} not found, post first", userID);
                return NotFound();
            }

            data.SerializeStorage = serial;

            try
            {
                _dataContext.UserData.Update(data);
                _dataContext.SaveChanges();
                _logger.LogInformation("Updating data");
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogWarning("Concurrency issue");
                return Ok();
            }
        }

        [HttpGet("serial/{userID}")]
        public IActionResult GetUserSerial(string userID)
        {
            UserData data = _dataContext.UserData.FirstOrDefault(d => d.UserId == userID);
            if (data == null)
            {
                _logger.LogWarning("Data for user ID {id} not found, post first", userID);
                return NotFound();
            }

            return Ok(data.SerializeStorage);
        }

        [HttpPut("dserial/{userID}")]
        public IActionResult PutDataSerial(int dataID, string serial)
        {
            UserData data = _dataContext.UserData.FirstOrDefault(d => d.ID == dataID);
            if (data == null)
            {
                _logger.LogWarning("Data for ID {id} not found, post first", dataID);
                return NotFound();
            }

            data.SerializeStorage = serial;

            try
            {
                _dataContext.UserData.Update(data);
                _dataContext.SaveChanges();
                _logger.LogInformation("Updating data");
                return Ok(data);
            }
            catch (Exception e)
            {
                _logger.LogWarning("Concurrency issue");
                return Ok();
            }
        }

        [HttpGet("dserial/{userID}")]
        public IActionResult GetDataSerial(int dataID)
        {
            UserData data = _dataContext.UserData.FirstOrDefault(d => d.ID == dataID);
            if (data == null)
            {
                _logger.LogWarning("Data for ID {id} not found, post first", dataID);
                return NotFound();
            }

            return Ok(data.SerializeStorage);
        }

        [HttpPut("sim")]
        public IActionResult PutSimValue([FromBody] SimulationValue simValue)
        {
            if (simValue == null)
            {
                _logger.LogWarning("simValue is null, provided simValue may be malformed");
                return BadRequest();
            }

            SimulationValue simValue1 = _dataContext.SimulationValues.Include("Tile").FirstOrDefault(s => s.ID == simValue.ID);
            if (simValue1 == null)
            {
                _logger.LogWarning("Provided ID does not match a simvalue");
                return BadRequest();
            }

            _dataContext.Tiles.Remove(simValue1.Tile);
            _dataContext.SimulationValues.Remove(simValue1);
            simValue.ID = 0;
            _dataContext.SimulationValues.Add(simValue);
            _dataContext.SaveChanges();
            return Ok();
        }
    }
}