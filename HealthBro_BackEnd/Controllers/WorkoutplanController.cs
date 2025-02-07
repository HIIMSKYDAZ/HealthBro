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

        [HttpGet("{token}/{userid}")]
        public async Task<IActionResult> Get(string token, int userid)
        {
            using (var cx = new HealthbroContext())
            {
                try
                {
                    var workoutPlans = await cx.Workoutplans.Where(wp => wp.UserId == userid).ToListAsync();
                    return Ok(workoutPlans);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "Internal server error: " + ex.Message);
                }
            }
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutPlanDTO>> CreateWorkoutPlan(WorkoutPlanDTO workoutPlanDTO)
        {
            if (workoutPlanDTO == null)
            {
                return BadRequest("Workout plan data is required.");
            }

            var workoutPlan = new Workoutplan
            {
                UserId = workoutPlanDTO.UserId,
                PlanName = workoutPlanDTO.PlanName,
                CreatedAt = DateTime.Now
            };

            _context.Workoutplans.Add(workoutPlan);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorkoutPlan), new { id = workoutPlan.PlanId }, workoutPlanDTO);
        }

        // PUT api/workoutplan/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWorkoutPlan(int id, WorkoutPlanDTO workoutPlanDTO)
        {
            if (workoutPlanDTO == null || id <= 0)
            {
                return BadRequest("Invalid workout plan data or ID.");
            }

            var workoutPlan = await _context.Workoutplans.FindAsync(id);
            if (workoutPlan == null)
            {
                return NotFound("Workout plan not found.");
            }

            workoutPlan.UserId = workoutPlanDTO.UserId;
            workoutPlan.PlanName = workoutPlanDTO.PlanName;

            _context.Entry(workoutPlan).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Workoutplans.Any(wp => wp.PlanId == id))
                {
                    return NotFound("Workout plan not found during update.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/workoutplan/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkoutPlan(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid workout plan ID.");
            }

            var workoutPlan = await _context.Workoutplans.FindAsync(id);
            if (workoutPlan == null)
            {
                return NotFound("Workout plan not found.");
            }

            _context.Workoutplans.Remove(workoutPlan);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
