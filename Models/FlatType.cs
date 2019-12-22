using System.ComponentModel.DataAnnotations;

namespace AppSystem.Models
{
    public class FlatType
    {
        public int id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [Required]
        public float bath { get; set; } 
        [Required]
        public int room { get; set; }
        
    }
}