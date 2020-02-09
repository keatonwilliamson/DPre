using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Capstone.Routes.V1;
using Microsoft.AspNetCore.Http;
using Capstone.Helpers;

namespace Capstone.Controllers.V1
{
    [ApiController]
    [Authorize]
    public class ValuesController : ControllerBase
    {
        public ValuesController()
        {
        }

        [HttpGet(Api.Values.GetAll)]
        public IActionResult GetAll()
        {
            var userId = HttpContext.GetUserId();
            var values = new[] { "value 111111", "value 22222", "value 33333", $"{userId}"};
            return Ok(values);
        }

        [HttpGet(Api.Values.Get)]
        public IActionResult Get(int id)
        {
            var value = $"value {id}";
            return Ok(value);
        }
    }
}