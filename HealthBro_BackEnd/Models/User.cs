using System;
using System.Collections.Generic;

namespace HealthBro_BackEnd.Models;

public partial class User
{
    public int Id { get; set; }

    public string LoginName { get; set; } = null!;

    public string Hash { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int? PermissionId { get; set; }

    public bool Active { get; set; }

    public string Email { get; set; } = null!;

    public string ProfilePicturePath { get; set; } = null!;

    public virtual Permission? Permission { get; set; } = null!;

    public virtual ICollection<Workoutplan>? Workoutplans { get; set; } = new List<Workoutplan>();

    public virtual ICollection<Workout>? Workouts { get; set; } = new List<Workout>();
}
