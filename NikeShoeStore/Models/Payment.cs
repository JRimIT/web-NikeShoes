using System;
using System.Collections.Generic;

namespace NikeShoeStore.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int OrderId { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string? PaymentStatus { get; set; }

    public decimal Amount { get; set; }

    public DateTime? PaymentDate { get; set; }

    public int? TransactionId { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual BankTransaction? Transaction { get; set; }
}
