﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CodegleydAPI.Models
{
    public class UserData
    {
        public int ID { get; set; }
        public string UserId { get; set; }
        public string DisplayName { get; set; }
        public int Gold { get; set; }
        public int GoldSpent { get; set; }
        public string SerializeStorage { get; set; }
        public virtual ICollection<SimulationValue> SimValues { get; set; }

        public UserData() { }

        public UserData(string userId)
        {
            this.Gold = 0;
            this.GoldSpent = 0;
            this.SerializeStorage = "q:q:c:c:f:f:";
            this.SimValues = new List<SimulationValue>();
            this.UserId = userId;
        }

        public UserData(string userId, string name)
        {
            this.Gold = 0;
            this.GoldSpent = 0;
            this.SerializeStorage = "q:q:c:c:f:f:";
            this.SimValues = new List<SimulationValue>();
            this.UserId = userId;
            this.DisplayName = name;
        }
    }
}
