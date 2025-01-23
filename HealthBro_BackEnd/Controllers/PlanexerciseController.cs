using Microsoft.AspNetCore.Mvc;
using HealthBro_BackEnd.Models;
using HealthBro_BackEnd.DTOs; // A DTO importálása
using Microsoft.EntityFrameworkCore;

namespace HealthBro_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanexerciseController : ControllerBase
    {
        private readonly HealthbroContext _context;

        public PlanexerciseController(HealthbroContext context)
        {
            _context = context;
        }

        // POST api/planexercise
        [HttpPost]
        public async Task<ActionResult<PlanExerciseDTO>> CreatePlanExercise(PlanExerciseDTO planExerciseDTO)
        {
            // Validálás, hogy ne legyen üres adat
            if (planExerciseDTO == null)
            {
                return BadRequest("PlanExercise data is required.");
            }

            // Új PlanExercise entitás létrehozása
            var planExercise = new Planexercise
            {
                PlanId = planExerciseDTO.PlanId,
                ExerciseId = planExerciseDTO.ExerciseId,
                Sets = planExerciseDTO.Sets,
                Weight = planExerciseDTO.Weight,
                Reps = planExerciseDTO.Reps
            };

            // Új PlanExercise mentése az adatbázisba
            _context.Planexercises.Add(planExercise);
            await _context.SaveChangesAsync();

            // A válasz visszaadása a létrehozott PlanExercise DTO-jával
            return CreatedAtAction(nameof(GetPlanExercise), new { id = planExercise.PlanExerciseId }, planExerciseDTO);
        }

        // Segédfüggvény egy PlanExercise lekérésére
        [HttpGet("{id}")]
        public async Task<ActionResult<PlanExerciseDTO>> GetPlanExercise(int id)
        {
            var planExercise = await _context.Planexercises
                .Include(pe => pe.Exercise) // Betölti a kapcsolódó Exercise entitást
                .Include(pe => pe.Plan) // Betölti a kapcsolódó Plan entitást
                .Where(pe => pe.PlanExerciseId == id)
                .FirstOrDefaultAsync();

            if (planExercise == null)
            {
                return NotFound();
            }

            // DTO visszaadása
            var planExerciseDTO = new PlanExerciseDTO
            {
                PlanId = planExercise.PlanId,
                ExerciseId = planExercise.ExerciseId,
                Sets = planExercise.Sets,
                Weight = planExercise.Weight,
                Reps = planExercise.Reps
            };

            return Ok(planExerciseDTO);
        }
    }
}
