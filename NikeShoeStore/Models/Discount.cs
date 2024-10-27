using System;
using System.Collections.Generic;

namespace NikeShoeStore.Models;

public partial class Discount
{
    public int DiscountId { get; set; }

    public string Code { get; set; } = null!;

    public string? DiscountType { get; set; }

    public decimal Amount { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public bool? IsActive { get; set; }
}
