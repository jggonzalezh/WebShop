using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{

    public enum OrderStatus{
        pending,
        shipped,
        delivered,
        cancel
    }
    public class Order
    {
        public int OrderID { get; set; }


        public int CustomerID { get; set; }

        public OrderStatus? Status { get; set; }

        public DateTime OrderDate { get; set; }

        public List<OrderItem> OrderItems { get; set;}

        public double Total(){
           var total =0.0;

           foreach (var item in OrderItems){

             total = total + (item.Quantity * item.Product.Price);
           }

           return total;

        }
    }
}