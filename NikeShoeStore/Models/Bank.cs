using System;
using System.Collections.Generic;

namespace NikeShoeStore.Models;

public partial class Bank
{
    public int BankId { get; set; }

    public string BankName { get; set; } = null!;

    public string BankCode { get; set; } = null!;

    public string? ContactEmail { get; set; }

    public string? ContactPhone { get; set; }

    public virtual ICollection<BankTransaction> BankTransactions { get; set; } = new List<BankTransaction>();
}
