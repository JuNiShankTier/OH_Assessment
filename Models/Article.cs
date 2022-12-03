using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OH_Assessment.Models
{
    public class Article
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ArticleId { get; set; }
        public double Price { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
