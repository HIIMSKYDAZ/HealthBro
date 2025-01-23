namespace HealthBro_BackEnd.DTOs
{
    public class PlanExerciseDTO
    {
        public int? PlanId { get; set; }
        public int? ExerciseId { get; set; }
        public int Sets { get; set; }
        public int Weight { get; set; }
        public int Reps { get; set; }
    }
}
