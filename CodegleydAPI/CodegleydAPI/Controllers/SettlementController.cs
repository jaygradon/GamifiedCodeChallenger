using System;
using System.IO;
using System.Net;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using MediaTypeHeaderValue = System.Net.Http.Headers.MediaTypeHeaderValue;

namespace CodegleydAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/settlement")]
    public class SettlementController : Controller
    {
        [HttpGet]
        public IActionResult GetBinJSON()
        {
            var result = JsonConvert.DeserializeObject(System.IO.File.ReadAllText(@"SettlementUnityFiles\bin.json"));
            return Ok(result);

        }

        [HttpGet("{param}")]
        public IActionResult GetDataUrl(string param)
        {

            string fileName = "";

            switch (param)
            {
                case "data":
                    fileName = @"SettlementUnityFiles/bin.data.unityweb";
                    break;
                case "code":
                    fileName = @"SettlementUnityFiles/bin.asm.code.unityweb";
                    break;
                case "framework":
                    fileName = @"SettlementUnityFiles/bin.asm.code.unityweb";
                    break;
                case "library":
                    fileName = @"SettlementUnityFiles\bin.asm.library.unityweb";
                    break;
                case "memory":
                    fileName = @"SettlementUnityFiles\bin.asm.memory.unityweb";
                    break;
            }

            return Ok(Response.SendFileAsync(fileName));
        }
    }
}