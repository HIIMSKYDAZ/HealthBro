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
            var exercises = await _context.Exercises
                .Select(e => new ExerciseDTO
                {
                    ExerciseId = e.ExerciseId,
                    Name = e.Name,
                    MuscleGroup = e.MuscleGroup,
                    Description = e.Description
                })
                .ToListAsync();

            return Ok(exercises);
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseDTO>> PostExercise(ExerciseDTO exerciseDTO)
        {
            var exercise = new Exercise
            {
                Name = exerciseDTO.Name,
                MuscleGroup = exerciseDTO.MuscleGroup,
                Description = exerciseDTO.Description
            };

            _context.Exercises.Add(exercise);
            await _context.SaveChangesAsync();

            exerciseDTO.ExerciseId = exercise.ExerciseId;

            return CreatedAtAction(nameof(GetExercises), new { id = exercise.ExerciseId }, exerciseDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutExercise(int id, ExerciseDTO exerciseDTO)
        {
            if (id != exerciseDTO.ExerciseId)
            {
                return BadRequest("The ID in the URL does not match the ID in the body.");
            }

            var exercise = await _context.Exercises.FindAsync(id);
            if (exercise == null)
            {
                return NotFound();
            }

            exercise.Name = exerciseDTO.Name;
            exercise.MuscleGroup = exerciseDTO.MuscleGroup;
            exercise.Description = exerciseDTO.Description;

            _context.Entry(exercise).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Exercises.Any(e => e.ExerciseId == id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercise(int id)
        {
            var exercise = await _context.Exercises.FindAsync(id);
            if (exercise == null)
            {
                return NotFound();
            }

            _context.Exercises.Remove(exercise);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
