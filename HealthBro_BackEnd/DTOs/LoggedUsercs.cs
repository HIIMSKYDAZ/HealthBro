namespace HealthBro_BackEnd.DTOs
{
    public class LoggedUsercs
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int? Permission { get; set; }
        public string ProfilePicturePath { get; set; }

        public string Token { get; set; }
    }
}
