using HealthBro_BackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthBro_BackEnd.DTOs;

namespace HealthBro_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("/Korlevel/{token}")]
        public async Task<IActionResult> GetKorlevel(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Permission.Level == 9)
            {
                using (var cx = new HealthbroContext())
                {
                    try
                    {
                        return Ok(await cx.Users.Include(f=>f.Permission).Select(f=>(new KorlevelDTO {Name=f.Name,Email=f.Email,PermissionName=f.Permission.Name })).ToListAsync());
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
        [HttpGet("/SingleUser/{token}")]
        public async Task<IActionResult> GetUserByToken(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token))
            {
                using (var cx = new HealthbroContext())
                {
                    try
                    {
                        // Token alapján azonosított felhasználó lekérése
                        var loggedInUser = Program.LoggedInUsers[token];
                        var user = await cx.Users.Include(f => f.Permission)
                                                 .FirstOrDefaultAsync(f => f.Id == loggedInUser.Id);

                        if (user == null)
                        {
                            return NotFound("Felhasználó nem található.");
                        }

                        // Csak a releváns adatokat küldjük vissza
                        return Ok(new
                        {
                            user.Id,
                            user.Name,
                            user.Email,
                            user.LoginName,
                            PermissionName = user.Permission.Name,
                            user.Active,
                            user.ProfilePicturePath
                        });
                    }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
                }
            }
            else
            {
                return BadRequest("Nincs jogosultsága!");
            }
        }
        [HttpPut("UpdateUser/{token}")]
        public async Task<IActionResult> UpdateUser(string token, [FromBody] UserUpdateRequest updateRequest)
        {
            if (Program.LoggedInUsers.ContainsKey(token))
            {
                using (var cx = new HealthbroContext())
                {
                    try
                    {
                        // Token alapján azonosított felhasználó lekérése
                        var loggedInUser = Program.LoggedInUsers[token];
                        var user = await cx.Users
                                            .FirstOrDefaultAsync(f => f.Id == loggedInUser.Id);

                        if (user == null)
                        {
                            return NotFound("Felhasználó nem található.");
                        }

                        // Csak azokat az adatokat módosítjuk, amik nem null értékűek
                        if (!string.IsNullOrEmpty(updateRequest.Name))
                        {
                            user.Name = updateRequest.Name;  // Frissítjük a nevet
                        }

                        if (!string.IsNullOrEmpty(updateRequest.ProfilePicturePath))
                        {
                            user.ProfilePicturePath = updateRequest.ProfilePicturePath;  // Frissítjük a profilképet
                        }

                        // Frissítjük a felhasználót az adatbázisban
                        cx.Update(user);
                        await cx.SaveChangesAsync();

                        return Ok("Felhasználó adatai sikeresen frissítve.");
                    }
                    catch (Exception ex)
                    {
                        return BadRequest($"Hiba történt: {ex.Message}");
                    }
                }
            }
            else
            {
                return BadRequest("Nincs jogosultsága!");
            }
        }

        [HttpGet("{token}")]
        public async Task<IActionResult> Get(string token)
        {
            if (Program.LoggedInUsers.ContainsKey(token) && Program.LoggedInUsers[token].Permission.Level == 9)
            {
                using (var cx = new HealthbroContext())
                {
                    try
                    {
                        return Ok(await cx.Users.Include(f => f.Permission).ToListAsync());
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
        public async Task<IActionResult> GetLoginName(string token, string loginName)
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
        public async Task<IActionResult> Post(string token, User user)
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
        public async Task<IActionResult> Put(string token, [FromBody] User updatedUser)
        {
            if (Program.LoggedInUsers.ContainsKey(token))
            {
                using (var cx = new HealthbroContext())
                {
                    try
                    {
                        // Kivesszük a felhasználót a token alapján
                        var loggedInUser = Program.LoggedInUsers[token];
                        var user = await cx.Users.FirstOrDefaultAsync(f => f.Id == loggedInUser.Id);

                        if (user == null)
                        {
                            return NotFound("Felhasználó nem található.");
                        }

                        // Csak azokat az adatokat módosítjuk, amik nem null értékűek
                        user.Name = updatedUser.Name ?? user.Name;
                        user.ProfilePicturePath = updatedUser.ProfilePicturePath ?? user.ProfilePicturePath;

                        // Frissítjük a felhasználót
                        cx.Update(user);
                        await cx.SaveChangesAsync();

                        return Ok("Felhasználó adatai módosítva.");
                    }
                    catch (Exception ex)
                    {
                        return BadRequest($"Hiba történt: {ex.Message}");
                    }
                }
            }
            else
            {
                return BadRequest("Nincs jogosultsága!");
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
                        cx.Remove(new User { Id = id });
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
