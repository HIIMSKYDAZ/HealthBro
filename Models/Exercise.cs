using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace HealthBro_BackEnd.Models;

public partial class Exercise
{
    public int ExerciseId { get; set; }

    public string Name { get; set; } = null!;

    public string MuscleGroup { get; set; } = null!;

    public string? Description { get; set; }
    [JsonIgnore]
    public virtual ICollection<Planexercise> Planexercises { get; set; } = new List<Planexercise>();
}
