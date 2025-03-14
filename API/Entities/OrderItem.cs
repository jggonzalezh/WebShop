using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class OrderItem
    {
        public int OrderItemID { get; set; }

        public int? OrderID { get; set; }

        public int ProductID { get; set; }

        [JsonIgnore]
        public Order? Order { get; set; }

        public Product? Product { get; set; }

        public int Quantity { get; set; }

    }
}