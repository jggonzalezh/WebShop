using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Category
    {
         public int CategoryID { get; set; }
         public string Name { get; set; }
         public string Description { get; set;}
        public List<ProductCategory> ProductCategories { get; set; }


    }
}