using System;
using System.Collections.Generic;

namespace HealthBro_BackEnd.Models;

public partial class Workout
{
    public int WorkoutId { get; set; }

    public int? UserId { get; set; }

    public DateTime? WorkoutDate { get; set; }

    public string? Notes { get; set; }

    public virtual User? User { get; set; }

    public virtual ICollection<Workoutdetail> Workoutdetails { get; set; } = new List<Workoutdetail>();
}
