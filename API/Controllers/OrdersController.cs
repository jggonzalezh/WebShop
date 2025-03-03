using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {

         private readonly WebShopContext _context;

    public OrdersController(WebShopContext context)
    {
        _context = context;
    }

       [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _context.Orders
        .FindAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        return order;
    }

        [HttpPost]
    public async Task<ActionResult<Order>> PostOrder([FromBody] CreateOrderRequestDTO request)
    {

         using var transaction = await _context.Database.BeginTransactionAsync(); // Start a transaction
     // 1️⃣ Save the Customer First
        _context.Customers.Add(request.Customer);
        await _context.SaveChangesAsync(); // Generates Customer ID

        // 2️⃣ Create the new Order with CustomerID and other details
        var newOrder = new Order
        {
            CustomerID = request.Customer.CustomerID,
            Status = OrderStatus.pending,
            OrderDate = DateTime.Now,
        };

        // 3️⃣ Add the Order to the database
        _context.Orders.Add(newOrder);
        await _context.SaveChangesAsync(); // Get the new Order ID

        // 4️⃣ Assign the OrderID to each OrderItem and add them in batch
        foreach (var orderItem in request.OrderItems)
        {
            orderItem.OrderID = newOrder.OrderID; // Associate OrderItems with the newly created Order
            _context.OrderItems.Add(orderItem); // Add OrderItem to the context
        }

        // 5️⃣ Save all changes in one go (after adding all OrderItems)
        await _context.SaveChangesAsync();

        // 6️⃣ Commit the transaction
        await transaction.CommitAsync();

        // 7️⃣ Return the Created Order with its ID (and related data)
        return CreatedAtAction(
            nameof(GetOrder),
            new { id = newOrder.OrderID },
            newOrder
        );
    }
        
    }
}