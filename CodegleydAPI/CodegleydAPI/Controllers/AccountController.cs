using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using CodegleydAPI.Models;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Collections;
using JWT;
using JWT.Serializers;
using JWT.Algorithms;
using Microsoft.Extensions.Options;
using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace CodegleydAPI.Controllers
{
  /// <summary>
  /// API controller for codegleyd account management.
  /// Accounts are required for authorizing users.
  /// </summary>
  [Route("api/[controller]")]
  public class AccountController : Controller
  {
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly JWTSettings _options;

    public AccountController(
      UserManager<IdentityUser> userManager,
      SignInManager<IdentityUser> signInManager,
      IOptions<JWTSettings> optionsAccessor)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _options = optionsAccessor.Value;
    }

    /// <summary>
    /// Registers and signs in new user credentials
    /// </summary>
    /// <param name="Credentials"> Requires Email and Password conforming to MS guidelines </param>
    /// <returns></returns>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Credentials Credentials)
    {
      if (ModelState.IsValid)
      {
        var user = new IdentityUser { UserName = Credentials.Email, Email = Credentials.Email };
        var result = await _userManager.CreateAsync(user, Credentials.Password);
        if (result.Succeeded)
        {
          await _signInManager.SignInAsync(user, isPersistent: false);
          return new JsonResult(new Dictionary<string, object>
          {
            { "access_token", GetAccessToken(Credentials.Email) },
            { "id_token", GetIdToken(user) }
          });
        }
        return Errors(result);

      }
      return Error("Unexpected error");
    }

    /// <summary>
    /// Signs in existing user credentials
    /// </summary>
    /// <param name="Credentials"> Requires Email and Password conforming to MS guidelines </param>
    /// <returns></returns>
    [HttpPost("signin")]
    public async Task<IActionResult> Signin([FromBody] Credentials Credentials)
    {
      if (ModelState.IsValid)
      {
        var result = await _signInManager.PasswordSignInAsync(Credentials.Email, Credentials.Password, false, false);
        if (result.Succeeded)
        {
          var user = await _userManager.FindByEmailAsync(Credentials.Email);
          return new JsonResult(new Dictionary<string, object>
      {
        { "access_token", GetAccessToken(Credentials.Email) },
        { "id_token", GetIdToken(user) }
      });
        }
        return new JsonResult("Unable to sign in") { StatusCode = 401 };
      }
      return Error("Unexpected error");
    }

    /// <summary>
    /// Generates a user id_token
    /// Token for client use only.
    /// </summary>
    private string GetIdToken(IdentityUser user)
    {
      var payload = new Dictionary<string, object>
      {
        { "id", user.Id },
        { "sub", user.Email },
        { "email", user.Email },
        { "emailConfirmed", user.EmailConfirmed },
      };
      return GetToken(payload);
    }

    /// <summary>
    /// Generates an access_token
    /// To be used in authorized requests in the Authorization header.
    /// </summary>
    private string GetAccessToken(string Email)
    {
      var payload = new Dictionary<string, object>
      {
        { "sub", Email },
        { "email", Email }
      };
      return GetToken(payload);
        }

    /// <summary>
    /// Generates a JSON Web Token (JWT)
    /// Consists of a Header, Payload, and Signature('.' separated).  Base64 encoded.
    /// See https://jwt.io/ for information on JWTs.
    /// </summary>
    private string GetToken(Dictionary<string, object> payload)
    {
      var secret = _options.SecretKey;

      payload.Add("iss", _options.Issuer);
      payload.Add("aud", _options.Audience);
      // not before
      payload.Add("nbf", ConvertToUnixTimestamp(DateTime.Now));
      // issued at
      payload.Add("iat", ConvertToUnixTimestamp(DateTime.Now));
      // expiration
      payload.Add("exp", ConvertToUnixTimestamp(DateTime.Now.AddDays(7)));
      IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
      IJsonSerializer serializer = new JsonNetSerializer();
      IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
      IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);

      return encoder.Encode(payload, secret);
    }

    ///
    /// Sends error messages as human-readable JSON
    ///
    private JsonResult Errors(IdentityResult result)
    {
      var items = result.Errors
          .Select(x => x.Description)
          .ToArray();
      return new JsonResult(items) { StatusCode = 400 };
    }

    private JsonResult Error(string message)
    {
      return new JsonResult(message) { StatusCode = 400 };
    }

    private static double ConvertToUnixTimestamp(DateTime date)
    {
      DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
      TimeSpan diff = date.ToUniversalTime() - origin;
      return Math.Floor(diff.TotalSeconds);
    }
  }
}