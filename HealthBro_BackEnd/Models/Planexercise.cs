using System;
using System.Collections.Generic;

namespace HealthBro_BackEnd.Models;

public partial class Planexercise
{
    public int PlanExerciseId { get; set; }

    public int? PlanId { get; set; }

    public int? ExerciseId { get; set; }

    public int Sets { get; set; }

    public int Reps { get; set; }

    public virtual Exercise? Exercise { get; set; }

    public virtual Workoutplan? Plan { get; set; }
}
