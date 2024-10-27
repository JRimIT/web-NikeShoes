using System;
using System.Collections.Generic;

namespace NikeShoeStore.Models;

public partial class BankTransaction
{
    public int TransactionId { get; set; }

    public int OrderId { get; set; }

    public int? BankId { get; set; }

    public int? GatewayId { get; set; }

    public DateTime? TransactionDate { get; set; }

    public decimal Amount { get; set; }

    public string Status { get; set; } = null!;

    public virtual Bank? Bank { get; set; }

    public virtual PaymentGateway? Gateway { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
