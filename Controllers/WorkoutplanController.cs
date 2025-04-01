using Microsoft.AspNetCore.Mvc;
using HealthBro_BackEnd.Models;
using HealthBro_BackEnd.DTOs; // A DTO importálása
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace HealthBro_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class WorkoutplanController : ControllerBase
    {
        private readonly HealthbroContext _context;

        public WorkoutplanController(HealthbroContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutPlanDTO>> GetWorkoutPlan(int id)
        {
            try
            {
                var workoutPlan = await _context.Workoutplans
                    .Where(wp => wp.PlanId == id)
                    .FirstOrDefaultAsync();

                if (workoutPlan == null)
                {
                    return NotFound();
                }

                var workoutPlanDTO = new WorkoutPlanDTO
                {
                    UserId = workoutPlan.UserId,
                    PlanName = workoutPlan.PlanName
                };

                return Ok(workoutPlanDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        [HttpGet("{token}/{userid}")]
        public async Task<IActionResult> Get(string token, int userid)
        {
            try
            {
                // Egyszerűsített lekérdezés a hibakeresés érdekében
                var workoutPlans = await _context.Workoutplans
                    .Where(wp => wp.UserId == userid)
                    .ToListAsync();

                return Ok(workoutPlans);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message + (ex.InnerException != null ? " Inner: " + ex.InnerException.Message : ""));
            }
        }

        // POST api/workoutplan
        [HttpPost]
        public async Task<ActionResult<WorkoutPlanDTO>> CreateWorkoutPlan(WorkoutPlanDTO workoutPlanDTO)
        {
            // Validálás, hogy ne legyen üres adat
            if (workoutPlanDTO == null)
            {
                return BadRequest("Workout plan data is required.");
            }

            // Új WorkoutPlan entitás létrehozása
            var workoutPlan = new Workoutplan
            {
                UserId = workoutPlanDTO.UserId,
                PlanName = workoutPlanDTO.PlanName,
                CreatedAt = DateTime.Now
            };

            // Új WorkoutPlan mentése az adatbázisba
            _context.Workoutplans.Add(workoutPlan);
            await _context.SaveChangesAsync();

            // A válasz visszaadása a létrehozott WorkoutPlan DTO-jával
            return CreatedAtAction(nameof(GetWorkoutPlan), new { id = workoutPlan.PlanId }, workoutPlanDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<WorkoutPlanDTO>> DeleteWorkoutPlan(int id)
        {
            try
            {
                var workoutPlan = await _context.Workoutplans
                    .FirstOrDefaultAsync(wp => wp.PlanId == id);

                if (workoutPlan == null)
                    return NotFound($"Nem található workout plan a következő ID-vel: {id}");

                _context.Workoutplans.Remove(workoutPlan);
                await _context.SaveChangesAsync();

                return new WorkoutPlanDTO
                {
                    UserId = workoutPlan.UserId,
                    PlanName = workoutPlan.PlanName
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba történt a törlés során: {ex}");
                return StatusCode(500, "Váratlan hiba történt a törlés során");
            }
        }
    }
}
