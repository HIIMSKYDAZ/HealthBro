namespace HealthBro_BackEnd.DTOs
{
    public class FullUserUpdateRequest
    {
            public int Id { get; set; }
            public string Name { get; set; }
            public string LoginName { get; set; }
            public string Email { get; set; }
            public string Hash { get; set; }
            public string Salt { get; set; }
            public int PermissionId { get; set; }
            public bool Active { get; set; }
            public string ProfilePicturePath { get; set; }
    }
}
