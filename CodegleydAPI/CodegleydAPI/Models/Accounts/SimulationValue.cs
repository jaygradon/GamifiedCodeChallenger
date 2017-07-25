using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    public class SimulationValue
    {
        public int ID { get; set; }
        public int XPos { get; set; }
        public int YPos { get; set; }
        public string Rotation { get; set; }
        public Tile Tile { get; set; }

        [ForeignKey("UserDataID")]
        public int UserDataID { get; set; }

        public SimulationValue() { }
    }
}
