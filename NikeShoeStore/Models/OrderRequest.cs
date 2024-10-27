namespace NikeShoeStore.Models
{
    public class OrderRequest
    {
        //public virtual CartItem CartItems { get; set; }
        public int UserId { get; set; }
        public int CartId { get; set; }
        public decimal TotalAmount { get; set; }
        public List<CartItemRequest> CartItems { get; set; }
    }
}
