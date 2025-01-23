namespace HealthBro_BackEnd.DTOs
{
    public class ExerciseDTO
    {
        public int ExerciseId { get; set; }
        public string Name { get; set; }
        public string MuscleGroup { get; set; }
        public string? Description { get; set; }
    }
}
