using System.ComponentModel.DataAnnotations;

namespace AppSystem.Models
{
    public class Flat
    {
        public int id { get; set; }
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [Required]
        public int floor { get; set; }
        [Required]
        public int flatno { get; set; }
        [Required]
        public Building Building { get; set; }
        [Required]
        public FlatType FlatType { get; set; }

    }
}