using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace NikeShoeStore.Models;

public partial class OrderItem
{
    public int OrderItemId { get; set; }

    public int OrderId { get; set; }

    public int ProductId { get; set; }

    public string? Color { get; set; }

    public string? Size { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }
    
    public virtual Order Order { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
