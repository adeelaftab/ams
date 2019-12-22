using System.ComponentModel.DataAnnotations;

namespace AppSystem.Models
{
    public class Building
    {
        public int Id { get; set;}
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [Required]
        public int floors{ get; set; }
        [Required]
        [MaxLength(255)]
        public string address { get; set; }
        [Required]
        [MaxLength(255)]
        public string location { get; set; }
    }
}