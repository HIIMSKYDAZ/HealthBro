using Microsoft.AspNetCore.Mvc;
using HealthBro_BackEnd.Models;
using HealthBro_BackEnd.DTOs; // A DTO importálása
using Microsoft.EntityFrameworkCore;

namespace HealthBro_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        private readonly HealthbroContext _context;

        public ExercisesController(HealthbroContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExerciseDTO>>> GetExercises()
        {
            // Az Exercise entitások DTO-vá alakítása
            var exercises = await _context.Exercises
                .Select(e => new ExerciseDTO
                {
                    ExerciseId = e.ExerciseId,
                    Name = e.Name,
                    MuscleGroup = e.MuscleGroup,
                    Description = e.Description
                })
                .ToListAsync();

            return Ok(exercises); // Az adatok visszaadása HTTP 200 státusszal
        }
    }
}
