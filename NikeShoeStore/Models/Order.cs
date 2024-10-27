using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace NikeShoeStore.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int UserId { get; set; }

    public decimal TotalAmount { get; set; }

    public string? OrderStatus { get; set; }

    public int? ShippingId { get; set; }

    public int? CartId { get; set; }
    [JsonIgnore]
    public virtual ICollection<BankTransaction> BankTransactions { get; set; } = new List<BankTransaction>();

    public virtual Cart? Cart { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ShippingMethod? Shipping { get; set; }

    public virtual User User { get; set; } = null!;
}
