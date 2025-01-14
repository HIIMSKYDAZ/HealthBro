using System;
using System.Collections.Generic;

namespace HealthBro_BackEnd.Models;

public partial class Workoutplan
{
    public int PlanId { get; set; }

    public int? UserId { get; set; }

    public string? PlanName { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Planexercise> Planexercises { get; set; } = new List<Planexercise>();

    public virtual User? User { get; set; }
}
