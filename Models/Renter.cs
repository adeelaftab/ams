using System.ComponentModel.DataAnnotations;

namespace AppSystem.Models
{
    public class Renter
    {
        public int id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [Required]
        [MaxLength(15)]
        public string phone { get; set; }
        public string email { get; set; }
        [Required]
        [MaxLength(255)]
        public string address { get; set; }
        [Required]
        public City City { get; set; }
        [Required]
        public Country Country { get; set; }
        [Required]
        public Nationality Nationality { get; set; }
        [Required]
        public string Identification { get; set; }
        public string Details { get; set; }
        [Required]
        public int TotalGuests { get; set; }
    }
}