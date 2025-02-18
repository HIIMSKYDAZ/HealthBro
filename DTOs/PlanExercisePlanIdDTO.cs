namespace HealthBro_BackEnd.DTOs
{
    public class PlanExercisePlanIdDTO
    {
        public int? PlanExerciseId { get; set; }
        public int? ExerciseId { get; set; }
        public int Sets { get; set; }
        public int Weight { get; set; }
        public int Reps { get; set; }
    }
}
