using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Karbantarto.Models
{
    public partial class User
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("loginName")]
        public string LoginName { get; set; } = null!;

        [JsonPropertyName("name")]
        public string Name { get; set; } = null!;

        [JsonPropertyName("salt")]
        public string Salt { get; set; } = null!;

        [JsonPropertyName("hash")]
        public string Hash { get; set; } = null!;

        [JsonPropertyName("email")]
        public string Email { get; set; } = null!;

        [JsonPropertyName("permissionId")]
        public int PermissionId { get; set; }

        [JsonPropertyName("active")]
        public bool Active { get; set; }

        [JsonPropertyName("profilePicturePath")]
        public string ProfilePicturePath { get; set; } = null!;

    }

}
