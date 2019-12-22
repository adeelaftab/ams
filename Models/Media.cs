using System.ComponentModel.DataAnnotations;

namespace AppSystem.Models
{
    public class Media
    {
        public int id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [Required]
        [MaxLength(255)]
        public string link { get; set; }
        public Flat Flat { get; set; }
    }
}