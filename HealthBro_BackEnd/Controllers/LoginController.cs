using HealthBro_BackEnd.DTOs;
using HealthBro_BackEnd.Models;
using HealthBro_BackEnd;
using HealthBro_BackEnd.DTOs;
using HealthBro_BackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthBro_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        [HttpPost("SaltRequest/{loginName}")]

        public async Task<IActionResult> SaltRequest(string loginName)
        { //cx = context
            using (var cx = new HealthbroContext())
            {
                try
                {
                    User response = await cx.Users.FirstOrDefaultAsync(f => f.LoginName == loginName);
                    if (response == null)
                    {
                        return BadRequest("Hiba");
                    }
                    return Ok(response.Salt);

                }
                catch (Exception ex)
                {

                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            using (var cx = new HealthbroContext())
            {
                try
                {
                    string Hash = HealthBro_BackEnd.Program.CreateSHA256(loginDTO.TmpHash);
                    User loggedUser =await cx.Users.Include(f=>f.Permission).FirstOrDefaultAsync(f => f.LoginName == loginDTO.LoginName && f.Hash == Hash);
                    if (loggedUser != null && loggedUser.Active)
                    {
                        string token = Guid.NewGuid().ToString();
                        lock (Program.LoggedInUsers)
                        {
                            Program.LoggedInUsers.Add(token, loggedUser);
                        }
                        return Ok(new LoggedUsercs
                        {
                            Name = loggedUser.Name,
                            Email = loggedUser.Email,
                            Permission = loggedUser.PermissionId,
                            ProfilePicturePath = loggedUser.ProfilePicturePath,
                            Token = token
                        });
                    }
                    else
                    {
                        return BadRequest("Hibás név vagy jelszó!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(new LoggedUsercs { Permission = -1, Name = ex.Message, ProfilePicturePath = "", Email = "" });
                }
            }
        }
    }
}