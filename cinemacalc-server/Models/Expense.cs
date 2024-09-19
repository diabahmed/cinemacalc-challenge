using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinemaCalcServer.Models
{
    public class Expense
    {
        public Expense()
        {
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [MinLength(1)]
        public required string Name { get; set; }

        [Required]
        [Column(TypeName = "decimal(13,2)")]
        public required decimal Price { get; set; }

        [Required]
        [Range(0, 100)]
        [Column(TypeName = "decimal(5,2)")]
        public required decimal PercentageMarkup { get; set; }

        [NotMapped]
        public decimal TotalPrice => Price + (Price * PercentageMarkup / 100);
    }
}
