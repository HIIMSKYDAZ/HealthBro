using HealthBro_BackEnd.Models;
using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthBro_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly HealthbroContext _context;

        public ReviewController(HealthbroContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetVelemeny()
        {
            try
            {
                var velemenyek = await _context.Reviews.ToListAsync();
                return Ok(velemenyek);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UjVelemeny(Review review)
        {
            try
            {
                if (review.Velemeny.Trim() == "")
                {
                    return BadRequest("Vélemény megadása kötelező!");
                }

                await _context.Reviews.AddAsync(review);
                await _context.SaveChangesAsync();
                return Ok("Sikeres véleményírás");
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

    }
}
