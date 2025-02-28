using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Data
{
    public class DbInitializer
    {
        public static void InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<WebShopContext>()
            ?? throw new InvalidOperationException("Failed to retrieve store context");

            seedData(context);

        }

        private static void seedData(WebShopContext context){

             context.Database.EnsureCreated();

            // Look for any Products.
            if (context.Products.Any())
            {
                return;   // DB has been seeded
            }

            var products = new Product[]
            {
                new Product{
                Title="ECHO Battery System DCS-2500T",
                ProductCode="DCS-2500T",
                SmallDescription="What do the pros need from a battery-powered chainsaw? ECHO asked, then designed the DCS-2500T to meet their demanding standards. On the strength of the ECHO Battery System, this lightweight beast is perfect for high-climbing professional arborists",
                Price=559.99,
                ImageUrl="",
                AvailableStock=100
                },
                 new Product{
                 Title="ECHO Battery System DCS-5000",
                 ProductCode="DCS-5000",
                 SmallDescription="Convenient, packed with features, and most importantly, packed with power. Capable of 200 cuts on a single charge, the DCS-5000 harnesses the professional-grade power of the ECHO 56V Battery System for smooth, easy cuts and all-day performance.",
                 Price=299.99,
                 ImageUrl="",
                 AvailableStock=100
                 },
                 new Product{
                 Title="ECHO Battery System DHC-2300",
                 ProductCode="DHC-2300",
                 SmallDescription="Beauty without bulkiness. The quiet, lightweight DHC-2300 hedge trimmer, powered by the ECHO 56V Battery System, makes precision cuts with a lightning-fast 53 strokes per second, trimming time and effort off the workday.",
                 Price=179.99,
                 ImageUrl="",
                 AvailableStock=100
                 },
                 new Product{
                 Title="ECHO Battery System DHC-22000",
                 ProductCode="DHC-2200",
                 SmallDescription="Designed for professionals, the DHC-2200 features 22 in. RazorEdge® blades along with an intelligent management system that optimizes motor speed, power delivery and battery usage.",
                 Price=459.99
                 ,
                 ImageUrl="",
                 AvailableStock=100
                 }


            };

            foreach (Product  p in products)
            {
                context.Products.Add(p);
            }
            context.SaveChanges();

            var categories = new Category[]
            {
            new Category{
            Name="Chainsaws",
            Description="ECHO chainsaws provide the power and durability to make light work of the toughest jobs"
            },
             new Category{
            Name="Hedge TrimmerSs",
            Description="From precise artistic shaping to heavier-duty, difficult-to-reach cuts, ECHO hedge trimmers deliver reliable, versatile performance for professionals and discerning homeowners alike."
            }
            };

            foreach (Category ca in categories)
            {
                context.Categories.Add(ca);
            }

            context.SaveChanges();

            var productCategories = new ProductCategory[]
            {
            new ProductCategory{
            ProductID=1,
            CategoryID=1
            },
            new ProductCategory{
            ProductID=2,
            CategoryID=1
            },
            new ProductCategory{
            ProductID=3,
            CategoryID=2
            },
            new ProductCategory{
            ProductID=4,
            CategoryID=2
            }
            };

            foreach (ProductCategory pc in productCategories)
            {
                context.ProductCategories.Add(pc);
            }

            context.SaveChanges();

            var customers = new Customer[]
            {
            new Customer {
                FullName = "Lysandra Serrano",
                Email = "facilisis@yahoo.edu",
                Address = "P.O. Box 529, 1923 Vitae, St."
            },
            new Customer{
                FullName = "Alfonso Johnston",
                Email = "et.magna@aol.edu",
                Address = "Ap #478-1348 Proin Avenue"
            },
            new Customer {
                FullName = "Philip Wilkerson",
                Email = "at.pretium@protonmail.ca",
                Address = "Ap #664-9713 Ipsum. St."
            }
            };

            foreach (Customer cu in customers)
            {
                context.Customers.Add(cu);
            }
            context.SaveChanges();

            var orders = new Order[]
            {

            new Order {
                CustomerID = 1,
                Status = OrderStatus.pending,
                OrderDate = DateTime.Parse("2025-02-27")
            }
 
            };
            foreach (Order o in orders)
            {
                context.Orders.Add(o);
            }
            context.SaveChanges();

            
            var ordersItems = new OrderItem[]
            {
            new OrderItem {
                OrderID = 1,
                ProductID =1 ,
                Quantity = 1
            },
            new OrderItem {
            OrderID = 1,
            ProductID =2 ,
            Quantity = 1
            }
            };
            foreach (OrderItem oi in ordersItems)
            {
                context.OrderItems.Add(oi);
            }
            context.SaveChanges();


        }
    }
}