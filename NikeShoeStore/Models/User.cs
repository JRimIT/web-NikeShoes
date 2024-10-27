using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace NikeShoeStore.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? UserImage { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Phone { get; set; }

    public int? RoleId { get; set; }
    [JsonIgnore]
    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual Role? Role { get; set; }

    public virtual ICollection<UserAddress> UserAddresses { get; set; } = new List<UserAddress>();

    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
