using System;
using System.Collections.Generic;

namespace NikeShoeStore.Models;

public partial class PaymentGateway
{
    public int GatewayId { get; set; }

    public string GatewayName { get; set; } = null!;

    public string GatewayType { get; set; } = null!;

    public string? ApiKey { get; set; }

    public string? ApiSecret { get; set; }

    public virtual ICollection<BankTransaction> BankTransactions { get; set; } = new List<BankTransaction>();
}
