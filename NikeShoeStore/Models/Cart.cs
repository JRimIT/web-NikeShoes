using System;
using System.Collections.Generic;

namespace NikeShoeStore.Models;

public partial class Cart
{
    public int CartId { get; set; }

    public int UserId { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User User { get; set; } = null!;
}
