using System.ComponentModel.DataAnnotations.Schema;

namespace OH_Assessment.Models
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int OrderId { get; set; }
        public int ArticleId { get; set; }
        public int Amount { get; set; }
        public DateTime DeliveryDay { get; set; }
        public string? Recipient { get; set; }
    }
}
