using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class CreateOrderRequestDTO
    {
        public  required Customer Customer { get; set; }
        public required List<OrderItem> OrderItems { get; set;}
    }
}