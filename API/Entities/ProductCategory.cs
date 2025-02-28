using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ProductCategory
    {
        public int ProductCategoryID { get; set; }

        public int ProductID { get; set; }
        public int CategoryID { get; set; }

        public Product Product { get; set;}
        public Category Category { get; set;} 
        
    }
}