using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Karbantarto.Models
{
    public partial class User
    {
        public int Id { get; set; }

        public string loginName { get; set; } = null!;

        public string name { get; set; } = null!;

        public string Salt { get; set; } = null!;

        public string Hash { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int Jogosultsag { get; set; }

        public int Aktiv { get; set; }


        public string profilPicturePath { get; set; } = null!;

    }

}
