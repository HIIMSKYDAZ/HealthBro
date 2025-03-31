using Microsoft.AspNetCore.Mvc;
using HealthBro_BackEnd.Models;
using HealthBro_BackEnd.DTOs; // A DTO importálása
using Microsoft.EntityFrameworkCore;

namespace HealthBro_BackEnd.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlanexerciseController : ControllerBase
    {
        private readonly HealthbroContext _context;

        public PlanexerciseController(HealthbroContext context)
        {
            _context = context;
        }

        [HttpGet("/PlanId/{id}")]
        public async Task<ActionResult<List<PlanExercisePlanIdDTO>>> GetPlanExercisePlanId(int id)
        {
            var planExercises = await _context.Planexercises
                .Where(pe => pe.PlanId == id)
                .ToListAsync();

            if (!planExercises.Any())
            {
                return NotFound();
            }

            var planExercisePlanIdDTOs = planExercises.Select(pe => new PlanExercisePlanIdDTO
            {
                PlanExerciseId = pe.PlanExerciseId,
                ExerciseId = pe.ExerciseId,
                Sets = pe.Sets,
                Weight = pe.Weight,
                Reps = pe.Reps
            }).ToList();

            return Ok(planExercisePlanIdDTOs);
        }

        [HttpGet("/PlanExercise/{id}")]
        public async Task<ActionResult<PlanExerciseDTO>> GetPlanExerciseId(int id)
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
            return CreatedAtAction(nameof(GetPlanExerciseId), new { id = planExercise.PlanExerciseId }, planExerciseDTO);
        }

        [HttpPut("/UpdatePlanExercises/{planId}")]
        public async Task<ActionResult> UpdatePlanExercises(int planId, [FromBody] List<PlanExerciseDTO> planExercises)
        {
            if (planExercises == null || !planExercises.Any())
            {
                return BadRequest("Nincsenek érvényes gyakorlatok a frissítéshez.");
            }

            try
            {
                // Ellenőrizzük, hogy a planId megegyezik-e az összes gyakorlatban
                if (planExercises.Any(pe => pe.PlanId != planId))
                {
                    return BadRequest("A planId nem egyezik az összes gyakorlatban.");
                }

                // Lekérjük a meglévő gyakorlatokat a planId alapján
                var existingExercises = await _context.Planexercises
                    .Where(pe => pe.PlanId == planId)
                    .ToListAsync();

                // Frissítjük vagy hozzáadjuk az összes gyakorlatot
                foreach (var exerciseDto in planExercises)
                {
                    // Nem ellenőrizzük, hogy létezik-e már a gyakorlat
                    var newExercise = new Planexercise
                    {
                        PlanId = exerciseDto.PlanId,
                        ExerciseId = exerciseDto.ExerciseId,
                        Sets = exerciseDto.Sets,
                        Weight = exerciseDto.Weight,
                        Reps = exerciseDto.Reps
                    };
                    _context.Planexercises.Add(newExercise);
                }

                // Töröljük az összes meglévő gyakorlatot a planId alapján
                _context.Planexercises.RemoveRange(existingExercises);

                await _context.SaveChangesAsync();
                return Ok("Gyakorlatok sikeresen frissítve.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Hiba történt a gyakorlatok frissítése során: {ex.Message}");
            }
        }

    }
}
