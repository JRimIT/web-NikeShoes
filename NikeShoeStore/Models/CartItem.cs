using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace NikeShoeStore.Models;

public partial class CartItem
{
    public int CartItemId { get; set; }

    public int CartId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public string Size { get; set; }

    public string Color { get; set; }
    [JsonIgnore]
    public virtual Cart Cart { get; set; } = null!;
    [JsonIgnore]
    public virtual Product Product { get; set; } = null!;
}
