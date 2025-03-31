using HealthBro_BackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace HealthBro_BackEnd.Controllers
{
    public class PasswordController : Controller
    {
        private readonly HealthbroContext _context;

        public PasswordController(HealthbroContext context)
        {
            _context = context;
        }

        [HttpPost("{loginName},{oldPassword},{newPassword}")]
        public async Task<IActionResult> JelszoMosositas(string loginName, string oldPassword, string newPassword)
        {
            try
            {
                User? user = _context.Users.FirstOrDefault(f => f.LoginName == loginName);
                if (user != null)
                {
                    if (Program.CreateSHA256(Program.CreateSHA256(oldPassword + user.Salt)) == user.Hash)
                    {
                        user.Hash = Program.CreateSHA256(Program.CreateSHA256(newPassword + user.Salt));
                        _context.Users.Update(user);
                        await _context.SaveChangesAsync();
                        return Ok("A jelszó módosítása sikeresen megtörtént.");
                    }
                    else
                    {
                        return StatusCode(201, "Hibás a régi jelszó!");
                    }
                }
                else
                {
                    return BadRequest("Nincs ilyen nevű felhasználó!");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("ForgotPassword/{Email}")]
        public async Task<IActionResult> ElfelejtettJelszo(string Email)
        {
            try
            {
                // Keresd meg a felhasználót az email cím alapján
                var user = _context.Users.FirstOrDefault(f => f.Email == Email);
                if (user != null)
                {
                    // Generálj egy új jelszót
                    string jelszo = Program.GenerateSalt().Substring(0, 16); // Ezt egy biztonságosabb generátorral cserélheted
                    user.Hash = Program.CreateSHA256(Program.CreateSHA256(jelszo + user.Salt));
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();

                    // Küldjük el az új jelszót HTML formátumban
                    Program.SendEmail(user.Email, "Elfelejtett jelszó",
                        $@"
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset='utf-8'>
                        <title>Elfelejtett jelszó</title>
                        <style>
                            body {{ font-family: Arial, sans-serif; line-height: 1.6; }}
                            .container {{ max-width: 600px; margin: 20px auto; padding: 20px; text-align: center; }}
                            .button {{ 
                                display: inline-block; 
                                padding: 10px 20px; 
                                background-color: #007bff; 
                                color: white !important; 
                                text-decoration: none !important; 
                                border-radius: 5px;
                                margin: 20px 0;
                                font-weight: bold;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h2>Kedves {user.LoginName}!</h2>
                            <p>Az Ön által kért jelszó-visszaállítási folyamatot elvégeztük.</p>
                            <p>Az új jelszava: <strong>{jelszo}</strong></p>
                            <p>Javasoljuk, hogy mihamarabb jelentkezzen be, és ha szükséges, változtassa meg a jelszavát a profilján.</p>
                            <p>Ha nem Ön kérte a jelszó-visszaállítást, kérjük, hagyja figyelmen kívül ezt az üzenetet.</p>
                            <p>Üdvözlettel,<br>
                            HealthBro csapata</p>
                        </div>
                    </body>
                    </html>
                    ");

                    return Ok("E-mail küldése megtörtént.");
                }
                else
                {
                    return StatusCode(210, "Nincs ilyen e-Mail cím!");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(211, ex.Message);
            }
        }
    }
}
