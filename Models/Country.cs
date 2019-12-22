using System.ComponentModel.DataAnnotations;

namespace AppSystem.Models
{
    public class Country
    {
        public int id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [Required]
        [MaxLength(5)]
        public string CountryCode { get; set; }
    }
}