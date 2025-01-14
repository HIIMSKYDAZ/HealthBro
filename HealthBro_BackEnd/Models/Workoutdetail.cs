using System;
using System.Collections.Generic;

namespace HealthBro_BackEnd.Models;

public partial class Workoutdetail
{
    public int WorkoutDetailId { get; set; }

    public int? WorkoutId { get; set; }

    public int? ExerciseId { get; set; }

    public decimal? Weight { get; set; }

    public int Reps { get; set; }

    public virtual Exercise? Exercise { get; set; }

    public virtual Workout? Workout { get; set; }
}
