using HealthBro_BackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HealthBro_BackEnd.DTOs;

namespace HealthBro_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly HealthbroContext _context;

        public UserController(HealthbroContext context)
        {
            _context = context;
        }

        [HttpGet("/Korlevel/{token}")]
        public async Task<IActionResult> GetKorlevel(string token)
        {
            if (Program.LoggedInUsers.TryGetValue(token, out var user) && user.Permission.Level == 9)
            {
                try
                {
                    var result = await _context.Users
                        .Include(f => f.Permission)
                        .Select(f => new KorlevelDTO
                        {
                            Name = f.Name,
                            Email = f.Email,
                            PermissionName = f.Permission.Name
                        })
                        .ToListAsync();

                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest("Nincs jogosultsága!");
        }

        [HttpGet("/SingleUser/{token}")]
        public async Task<IActionResult> GetUserByToken(string token)
        {
            if (Program.LoggedInUsers.TryGetValue(token, out var loggedInUser))
            {
                try
                {
                    var user = await _context.Users
                        .Include(f => f.Permission)
                        .FirstOrDefaultAsync(f => f.Id == loggedInUser.Id);

                    return user == null
                        ? NotFound("Felhasználó nem található.")
                        : Ok(new
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
            return BadRequest("Nincs jogosultsága!");
        }

        [HttpPut("UpdateUser/{token}")]
        public async Task<IActionResult> UpdateUser(string token, [FromBody] UserUpdateRequest updateRequest)
        {
            if (!Program.LoggedInUsers.TryGetValue(token, out var loggedInUser))
                return BadRequest("Nincs jogosultsága!");

            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(f => f.Id == loggedInUser.Id);

                if (user == null) return NotFound("Felhasználó nem található.");

                if (!string.IsNullOrEmpty(updateRequest.Name))
                    user.Name = updateRequest.Name;

                if (!string.IsNullOrEmpty(updateRequest.ProfilePicturePath))
                    user.ProfilePicturePath = updateRequest.ProfilePicturePath;

                _context.Update(user);
                await _context.SaveChangesAsync();

                return Ok("Felhasználó adatai sikeresen frissítve.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Hiba történt: {ex.Message}");
            }
        }

        // További végpontok hasonlóan...

        [HttpGet("{token}")]
        public async Task<IActionResult> Get(string token)
        {
            if (Program.LoggedInUsers.TryGetValue(token, out var user) && user.Permission.Level == 9)
            {
                try
                {
                    return Ok(await _context.Users.Include(f => f.Permission).ToListAsync());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            return BadRequest("Nincs jogosultsága!");
        }

        [HttpPost("{token}")]
        public async Task<IActionResult> Post(string token, User user)
        {
            if (!Program.LoggedInUsers.TryGetValue(token, out var loggedInUser) || loggedInUser.Permission.Level != 9)
                return BadRequest("Nincs jogosultsága!");

            try
            {
                await _context.AddAsync(user);
                await _context.SaveChangesAsync();
                return Ok("Új felhasználó adatai eltárolva.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //teljes modosítas
        [HttpPut("UpdateFullUser/{token}")]
        public async Task<IActionResult> UpdateFullUser(string token, [FromBody] FullUserUpdateRequest request)
        {
            if (!Program.LoggedInUsers.TryGetValue(token, out var loggedInUser) || loggedInUser.Permission.Level != 9)
                return BadRequest("Nincs jogosultsága!");

            try
            {
                var user = await _context.Users.FindAsync(request.Id);
                if (user == null)
                    return NotFound("Felhasználó nem található.");

                user.Name = request.Name;
                user.LoginName = request.LoginName;
                user.Email = request.Email;
                user.Hash = request.Hash;
                user.Salt = request.Salt;
                user.PermissionId = request.PermissionId;
                user.Active = request.Active;
                user.ProfilePicturePath = request.ProfilePicturePath;

                _context.Update(user);
                await _context.SaveChangesAsync();

                return Ok("Felhasználó sikeresen módosítva.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Hiba történt: {ex.Message}");
            }
        }

        //email módosítása
        [HttpPut("UpdateUserMail/{token}")]
        public async Task<IActionResult> UpdateUserMail(string token, [FromBody] UserUpdatetEmail updateRequest)
        {
            if (Program.LoggedInUsers.ContainsKey(token))
            {
                try
                {
                    var loggedInUser = Program.LoggedInUsers[token];
                    var user = await _context.Users
                                        .FirstOrDefaultAsync(f => f.Id == loggedInUser.Id);
        
                    if (user == null)
                    {
                        return NotFound("Felhasználó nem található.");
                    }
        
        
                    if (!string.IsNullOrEmpty(updateRequest.Email))
                    {
                        user.Email = updateRequest.Email;
                    }
        
                    _context.Update(user);
                    await _context.SaveChangesAsync();
        
                    return Ok("Felhasználó adatai sikeresen frissítve.");
                }
                catch (Exception ex)
                {
                    return BadRequest($"Hiba történt: {ex.Message}");
                }
            }
            else
            {
                return BadRequest("Nincs jogosultsága!");
            }
        }

        //törlés
        [HttpDelete("DeleteUser/{id}/{token}")]
        public async Task<IActionResult> DeleteUser(int id, string token)
        {
            if (!Program.LoggedInUsers.TryGetValue(token, out var loggedInUser))
                return BadRequest("Nincs jogosultsága!");

            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                    return NotFound("Felhasználó nem található.");

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok("Felhasználó sikeresen törölve.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Hiba történt: {ex.Message}");
            }
        }
    }
}
