using System;
using System.Collections.Generic;

namespace NikeShoeStore.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string Name { get; set; } = null!;

    public decimal Price { get; set; }

    public string? Category { get; set; }

    public int? Stock { get; set; }

    public string? Size { get; set; }

    public string? Color { get; set; }

    public string? ListColor { get; set; }

    public string? Description { get; set; }

    public string? PrimaryImage { get; set; }

    public string? ProductDescriptionStyleColor { get; set; }

    public string? ProductDescriptionCountryOrigin { get; set; }

    public string? ProMessageList { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
