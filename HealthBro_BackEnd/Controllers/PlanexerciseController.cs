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

        [HttpGet("{id}")]
        public async Task<ActionResult<PlanExerciseDTO>> GetPlanExercise(int id)
        {
            var planExercise = await _context.Planexercises
                .Include(pe => pe.Exercise)
                .Include(pe => pe.Plan)
                .FirstOrDefaultAsync(pe => pe.PlanExerciseId == id); // Egyszerűsítve

            if (planExercise == null)
            {
                return NotFound();
            }

            var planExerciseDTO = new PlanExerciseDTO
            {
                PlanExerciseId = planExercise.PlanExerciseId, // Hozzáadva
                PlanId = planExercise.PlanId,
                ExerciseId = planExercise.ExerciseId,
                Sets = planExercise.Sets,
                Weight = planExercise.Weight,
                Reps = planExercise.Reps
            };

            return Ok(planExerciseDTO);
        }

        // POST api/planexercise
        [HttpPost]
        public async Task<ActionResult<PlanExerciseDTO>> CreatePlanExercise(PlanExerciseDTO planExerciseDTO)
        {
            if (planExerciseDTO == null)
            {
                return BadRequest("PlanExercise data is required.");
            }

            var planExercise = new Planexercise
            {
                PlanId = planExerciseDTO.PlanId,
                ExerciseId = planExerciseDTO.ExerciseId,
                Sets = planExerciseDTO.Sets,
                Weight = planExerciseDTO.Weight,
                Reps = planExerciseDTO.Reps
            };

            _context.Planexercises.Add(planExercise);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlanExercise), new { id = planExercise.PlanExerciseId }, planExerciseDTO);
        }

        // PUT api/planexercise/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlanExercise(int id, PlanExerciseDTO planExerciseDTO)
        {
            if (id != planExerciseDTO.PlanExerciseId)
            {
                return BadRequest("The ID in the URL does not match the ID in the body.");
            }

            var planExercise = await _context.Planexercises.FindAsync(id);
            if (planExercise == null)
            {
                return NotFound();
            }

            planExercise.PlanId = planExerciseDTO.PlanId;
            planExercise.ExerciseId = planExerciseDTO.ExerciseId;
            planExercise.Sets = planExerciseDTO.Sets;
            planExercise.Weight = planExerciseDTO.Weight;
            planExercise.Reps = planExerciseDTO.Reps;

            _context.Entry(planExercise).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Planexercises.Any(pe => pe.PlanExerciseId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/planexercise/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlanExercise(int id)
        {
            var planExercise = await _context.Planexercises.FindAsync(id);
            if (planExercise == null)
            {
                return NotFound();
            }

            _context.Planexercises.Remove(planExercise);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
