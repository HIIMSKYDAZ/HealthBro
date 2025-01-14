using System;
using System.Collections.Generic;

namespace HealthBro_BackEnd.Models;

public partial class Exercise
{
    public int ExerciseId { get; set; }

    public string Name { get; set; } = null!;

    public string MuscleGroup { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Planexercise> Planexercises { get; set; } = new List<Planexercise>();

    public virtual ICollection<Workoutdetail> Workoutdetails { get; set; } = new List<Workoutdetail>();
}
