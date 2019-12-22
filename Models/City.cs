using System.ComponentModel.DataAnnotations;

namespace AppSystem.Models
{
    public class City
    {
        public int id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        public Country Country { get; set; }
    }
}