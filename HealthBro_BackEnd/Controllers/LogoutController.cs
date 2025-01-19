using Microsoft.AspNetCore.Mvc;

namespace HealthBro_BackEnd.Controllers
{
    public class LogoutController : Controller
    {
        [HttpPost("{token}")]

        public IActionResult Logout(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token))
            {
                Program.LoggedInUsers.Remove(token);
                return Ok("Sikeres kijelentkezés.");
            }
            else
            {
                return BadRequest("Sikertelen kijelentkezés.");
            }
        }


    }
}
