using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Product
    {
        public int ProductID { get; set; }

        public string Title { get; set; }

        public string ProductCode { get; set; }

        public string SmallDescription { get; set; }

        public double Price { get; set; }

        public string ImageUrl { get; set; }

        public int AvailableStock { get; set; }

        public List<ProductCategory> ProductCategories { get; set; }

    }
}