using System;
using System.Collections.Generic;

namespace HealthBro_BackEnd.Models;

public partial class Review
{
    public int Id { get; set; }

    public string FelhasznaloNev { get; set; } = null!;

    public string Velemeny { get; set; } = null!;

    public string ProfilePicturePath { get; set; } = null!;
}
