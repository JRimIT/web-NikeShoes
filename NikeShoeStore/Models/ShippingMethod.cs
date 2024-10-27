using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace NikeShoeStore.Models;

public partial class ShippingMethod
{
    public int ShippingId { get; set; }

    public string MethodName { get; set; } = null!;

    public decimal Cost { get; set; }

    public string? EstimatedDeliveryTime { get; set; }
    [JsonIgnore]
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
