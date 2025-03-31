using HealthBro_BackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace HealthBro_BackEnd.Controllers
{
    public class LogoutController : Controller
    {
        private readonly HealthbroContext _context;

        public LogoutController(HealthbroContext context)
        {
            _context = context;
        }

        [HttpPost("{token}")]
        public async Task<IActionResult> Logout(string token)
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
