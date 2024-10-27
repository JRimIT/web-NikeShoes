namespace NikeShoeStore.Models
{
    public class CartItemRequest
    {
        public int CartItemId { get; set; }         // Cart item ID
        public int ProductId { get; set; }           // Product ID
        public int Quantity { get; set; }            // Quantity of the product
        public string ProductName { get; set; }      // Name of the product
        public decimal Price { get; set; }           // Price of the product
        public string CartColor { get; set; }        // Color of the cart item
        public string CartSize { get; set; }         // Size of the cart item
        public string Image { get; set; }            // Image URL of the product
        public string ProductColor { get; set; }     // Available colors for the product
        public string ProductSize { get; set; }      // Available sizes for the product
        public string Description { get; set; }      // Product description
    }
}
