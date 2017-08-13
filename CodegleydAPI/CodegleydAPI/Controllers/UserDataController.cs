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
        public IActionResult Post(string userID)
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

            data = new UserData(userID);
            _dataContext.Add(data);
            _dataContext.SaveChanges();
            this._logger.LogInformation("Creating user data");

            return Ok(data);
        }

//        /// <summary>
//        /// Spends unspent gold to 'upgrade' tiles.
//        /// </summary>
//        /// <param name="userID">The id of the owning user</param>
//        /// <returns>Ok with updated data or NotFound</returns>
//        [HttpPut("gold/{userID}")]
//        public IActionResult SpendGold(string userID)
//        {
//            IdentityUser user = _userContext.Users.FirstOrDefault(u => u.Id == userID);
//            if (user == null)
//            {
//                this._logger.LogWarning("User with user id {id} not found", userID);
//                return NotFound();
//            }
//
//            UserData data = _dataContext.UserData.FirstOrDefault(d => d.UserId == userID);
//            if (data == null)
//            {
//                this._logger.LogWarning("Data with user id {id} not found", userID);
//                return NotFound();
//            }
//
//            data = this.spendGold(data);
//
//            _dataContext.Update(data);
//            _dataContext.SaveChanges();
//            this._logger.LogInformation("Creating user data");
//
//            return Ok(data);
//        }

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
            existingData.SimValues = data.SimValues;

            _dataContext.UserData.Update(existingData);
            _dataContext.SaveChanges();
            _logger.LogInformation("Updating data");
            return Ok(data);
        }

        private UserData spendGold(UserData data)
        {
            return data;
        }
    }
}