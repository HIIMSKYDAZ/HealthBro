using HealthBro_BackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthBro_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        [HttpPost]

        public async Task<IActionResult> Registry(User user)
        {
            using (var cx = new HealthbroContext())
            {
                try
                {
                    if (cx.Users.FirstOrDefault(f => f.LoginName == user.LoginName) != null)
                    {
                        return Ok("Már létezik ilyen felhasználónév!");
                    }
                    if (cx.Users.FirstOrDefault(f => f.Email == user.Email) != null)
                    {
                        return Ok("Ezzel az e-mail címmel már regisztráltak!");
                    }
                    user.PermissionId = 1;
                    user.Active = false;
                    user.Hash = Program.CreateSHA256(user.Hash);
                    await cx.Users.AddAsync(user);
                    await cx.SaveChangesAsync();

                    Program.SendEmail(user.Email, "Regisztráció megerősítése",
                         $@"
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset='utf-8'>
                            <title>Regisztráció megerősítése</title>
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

                                <p>Köszönjük, hogy regisztrált az oldalunkon!</p>

                                <p>Kérjük, erősítse meg regisztrációját a lenti linkre kattintva:</p>

                                <a href='https://localhost:5000/api/Registry/EndOfTheRegistry?felhasznaloNev={user.LoginName}&email={user.Email}' class='button'>
                                    Regisztráció megerősítése
                                </a>

                                <p>Ha nem Ön regisztrált, kérjük, hagyja figyelmen kívül ezt az üzenetet.</p>

                                <p>Üdvözlettel,<br>
                                HealthBro csapata</p>

                                <hr>
                                <small>
                                    Ha problémája adódna a link használatával, másolja be ezt a címet a böngészőjébe:<br>
                                    https://localhost:5000/api/Registry/EndOfTheRegistry?felhasznaloNev={user.LoginName}&email={user.Email}
                                </small>
                            </div>
                        </body>
                        </html>
                        ");


                    return Ok("Sikeres regisztráció. Fejezze be a regisztrációját az e-mail címére küldött link segítségével!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }


        [HttpGet("EndOfTheRegistry")]
        public async Task<IActionResult> EndOfTheRegistry(string felhasznaloNev, string email)
        {
            using (var cx = new HealthbroContext())
            {
                try
                {
                    User user = await cx.Users.FirstOrDefaultAsync(f => f.LoginName == felhasznaloNev && f.Email == email);
                    if (user == null)
                    {
                        return BadRequest("Sikertelen a regisztráció befejezése!");
                    }

                    user.Active = true;
                    cx.Users.Update(user);
                    await cx.SaveChangesAsync();

                    // Sikeres megerősítés után átirányítunk a bejelentkezési oldalra
                    return Redirect("http://localhost:3000/login");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }



    }
}
