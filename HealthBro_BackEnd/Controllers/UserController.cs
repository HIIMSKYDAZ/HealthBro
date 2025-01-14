using HealthBro_BackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthBro_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("{token}")]
        public async Task<IActionResult> Get(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Permission.Level == 9)
            {
                using (var cx = new HealthbroContext())
                {
                    try
                    {
                        return  Ok(await cx.Users.Include(f => f.Permission).ToListAsync());
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                       
                    }
                }
            }
            else
            {
                return BadRequest("Nincs jogosultsaga!");
            }            
        }

        [HttpGet("{token},{loginName}")]
        public async Task<IActionResult> GetLoginName(string token,string loginName)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Permission.Level == 9)
            {
                using (var cx = new HealthbroContext())
                {
                    try
                    {
                        return Ok(await cx.Users.Include(f => f.Permission).FirstOrDefaultAsync(f => f.LoginName == loginName));
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);

                    }
                }
            }
            else
            {
                return BadRequest("Nincs jogosultsaga!");
            }
        }

        [HttpPost("{token}")]
        public async Task<IActionResult> Post(string token,User user)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Permission.Level == 9)
            {
                using (var cx = new HealthbroContext())
                {
                    try
                    {
                        cx.Add(user);
                        await cx.SaveChangesAsync();
                        return Ok("Új felhasználó adatai eltárolva.");
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);

                    }
                }
            }
            else
            {
                return BadRequest("Nincs jogosultsaga!");
            }
        }

        [HttpPut("{token}")]
        public async Task<IActionResult> Put(string token, User user)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Permission.Level == 9)
            {
                using (var cx = new HealthbroContext())
                {
                    try
                    {
                        cx.Update(user);
                        await cx.SaveChangesAsync();
                        return Ok("Felhasználó adatai módosítva.");
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);

                    }
                }
            }
            else
            {
                return BadRequest("Nincs jogosultsaga!");
            }
        }


        [HttpDelete("{token},{id}")]
        public async Task<IActionResult> Delete(string token, int id)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Permission.Level == 9)
            {
                using (var cx = new HealthbroContext())
                {
                    try
                    {
                        cx.Remove(new User {Id=id});
                        await cx.SaveChangesAsync();
                        return Ok("Felhasználó adatai törölve.");
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);

                    }
                }
            }
            else
            {
                return BadRequest("Nincs jogosultsaga!");
            }
        }
    }
}
