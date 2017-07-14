using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    public class Tile
    {
        public int ID { get; set; }
        public int Code { get; set; }
        public int Cost { get; set; }
        public int Value { get; set; }
        public string Type { get; set; }
        public string Label { get; set; }

        public Tile() { }
    }
}