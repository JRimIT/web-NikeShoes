using System;
using System.Collections.Generic;

namespace NikeShoeStore.Models;

public partial class UserAddress
{
    public int AddressId { get; set; }

    public int UserId { get; set; }

    public string AddressLine { get; set; } = null!;

    public string City { get; set; } = null!;

    public string? State { get; set; }

    public string Country { get; set; } = null!;

    public string? PostalCode { get; set; }

    public virtual User User { get; set; } = null!;
}
