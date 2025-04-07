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

        // POST: api/Exercises
        [HttpPost]
        public async Task<ActionResult<ExerciseDTO>> PostExercise(ExerciseDTO exerciseDto)
        {
            // Új Exercise entitás létrehozása a DTO alapján
            var exercise = new Exercise
            {
                Name = exerciseDto.Name,
                MuscleGroup = exerciseDto.MuscleGroup,
                Description = exerciseDto.Description
            };

            _context.Exercises.Add(exercise);
            await _context.SaveChangesAsync();

            // Visszaalakítás DTO-vá a létrehozott entitásból
            exerciseDto.ExerciseId = exercise.ExerciseId;

            // CreatedAtAction visszatér HTTP 201 státusszal, valamint a létrehozott erőforrás elérési útjával
            return CreatedAtAction(nameof(GetExercises), new { id = exercise.ExerciseId }, exerciseDto);
        }

        // PUT: api/Exercises/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExercise(int id, ExerciseDTO exerciseDto)
        {
            if (id != exerciseDto.ExerciseId)
            {
                return BadRequest("Az azonosítók nem egyeznek.");
            }

            // Az entitás lekérése az adatbázisból
            var exercise = await _context.Exercises.FindAsync(id);
            if (exercise == null)
            {
                return NotFound();
            }

            // Frissítjük az entitás mezőit
            exercise.Name = exerciseDto.Name;
            exercise.MuscleGroup = exerciseDto.MuscleGroup;
            exercise.Description = exerciseDto.Description;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExerciseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Nincs tartalom visszaadva, csak a HTTP 204 No Content státusz
            return NoContent();
        }

        // DELETE: api/Exercises/5
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

            // Nincs tartalom visszaadva, csak a HTTP 204 No Content státusz
            return NoContent();
        }

        // Segédmetódus az entitás létezésének ellenőrzésére
        private bool ExerciseExists(int id)
        {
            return _context.Exercises.Any(e => e.ExerciseId == id);
        }
    }
}
