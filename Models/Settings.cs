using System;
using System.Collections.Generic;

namespace AppSystem.Models
{
    public class Settings
    {
        public int? total_count {get;set;}
         public List<Country>  items{get;set;}

            public Settings()
            {

            this.items = new List<Country>();
            }

    }


   
}