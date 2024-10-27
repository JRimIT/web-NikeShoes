using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NikeShoeStore.Data;
using NikeShoeStore.Models;
using NikeShoeStore.Service;

namespace NikeShoeStore.MySQL.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly NikeShoeStoreDbContext _context;

        public OrdersController(NikeShoeStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders
                                 .Include(o => o.BankTransactions)
                                 .Include(o => o.Cart)
                                 .Include(o => o.OrderItems)
                                 .Include(o => o.Payments)
                                 .Include(o => o.Shipping)
                                 .Include(o => o.User)
                                 .ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders
                                      .Include(o => o.Cart)
                                      .Include(o => o.OrderItems)
                                      .Include(o => o.Payments)
                                      .Include(o => o.Shipping)
                                      .Include(o => o.User)
                                      .Where(o => o.UserId == id)
                                      .ToListAsync();
            if (order == null)
            {
                return NotFound();
            }

            return new JsonResult(order);
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]  
        public async Task<ActionResult<Order>> PostOrder(OrderRequest orderRequest)
        {
            var order = new Order
            {
                UserId = orderRequest.UserId,
                TotalAmount = orderRequest.TotalAmount,
                OrderStatus = "pending",
                CartId = orderRequest.CartId
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            foreach (var item in orderRequest.CartItems)
            {
                var orderItem = new OrderItem
                {
                    OrderItemId = order.OrderId,
                    OrderId = order.OrderId,
                    ProductId = item.ProductId,
                    Color = item.CartColor,
                    Size = item.CartSize,
                    Quantity = item.Quantity,
                    Price = item.Price
                };
                _context.OrderItems.Add(orderItem);
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }

        // PATCH api/order/{id}
        [HttpPatch("{id}")]
        public async Task<ActionResult<Order>> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatus updateDTO)
        {
            if (updateDTO == null || string.IsNullOrEmpty(updateDTO.OrderStatus))
            {
                return BadRequest("Invalid order status");
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            order.OrderStatus = updateDTO.OrderStatus;
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
