using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using NikeShoeStore.Models;
using Microsoft.EntityFrameworkCore.Proxies;

namespace NikeShoeStore.Data;

public partial class NikeShoeStoreDbContext : DbContext
{
    public NikeShoeStoreDbContext(DbContextOptions<NikeShoeStoreDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Bank> Banks { get; set; }

    public virtual DbSet<BankTransaction> BankTransactions { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<CartItem> CartItems { get; set; }

    public virtual DbSet<Discount> Discounts { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<PaymentGateway> PaymentGateways { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<ShippingMethod> ShippingMethods { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserAddress> UserAddresses { get; set; }

    public virtual DbSet<Wishlist> Wishlists { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Bank>(entity =>
        {
            entity.HasKey(e => e.BankId).HasName("PRIMARY");

            entity.ToTable("banks");

            entity.Property(e => e.BankId).HasColumnName("bank_id");
            entity.Property(e => e.BankCode)
                .HasMaxLength(20)
                .HasColumnName("bank_code");
            entity.Property(e => e.BankName)
                .HasMaxLength(255)
                .HasColumnName("bank_name");
            entity.Property(e => e.ContactEmail)
                .HasMaxLength(255)
                .HasColumnName("contact_email");
            entity.Property(e => e.ContactPhone)
                .HasMaxLength(20)
                .HasColumnName("contact_phone");
        });

        modelBuilder.Entity<BankTransaction>(entity =>
        {
            entity.HasKey(e => e.TransactionId).HasName("PRIMARY");

            entity.ToTable("bank_transactions");

            entity.HasIndex(e => e.BankId, "bank_id");

            entity.HasIndex(e => e.GatewayId, "gateway_id");

            entity.HasIndex(e => e.OrderId, "order_id");

            entity.Property(e => e.TransactionId).HasColumnName("transaction_id");
            entity.Property(e => e.Amount)
                .HasPrecision(10, 2)
                .HasColumnName("amount");
            entity.Property(e => e.BankId).HasColumnName("bank_id");
            entity.Property(e => e.GatewayId).HasColumnName("gateway_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Status)
                .HasColumnType("enum('success','failure','pending')")
                .HasColumnName("status");
            entity.Property(e => e.TransactionDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("transaction_date");

            entity.HasOne(d => d.Bank).WithMany(p => p.BankTransactions)
                .HasForeignKey(d => d.BankId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("bank_transactions_ibfk_2");

            entity.HasOne(d => d.Gateway).WithMany(p => p.BankTransactions)
                .HasForeignKey(d => d.GatewayId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("bank_transactions_ibfk_3");

            entity.HasOne(d => d.Order).WithMany(p => p.BankTransactions)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("bank_transactions_ibfk_1");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PRIMARY");

            entity.ToTable("cart");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.CartId).HasColumnName("cart_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("cart_ibfk_1");
        });

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.HasKey(e => e.CartItemId).HasName("PRIMARY");

            entity.ToTable("cart_items");

            entity.HasIndex(e => e.CartId, "cart_id");

            entity.HasIndex(e => e.ProductId, "product_id");

            entity.Property(e => e.CartItemId).HasColumnName("cart_item_id");
            entity.Property(e => e.CartId).HasColumnName("cart_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Cart).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.CartId)
                .HasConstraintName("cart_items_ibfk_1");

            entity.HasOne(d => d.Product).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("cart_items_ibfk_2");
        });

        modelBuilder.Entity<Discount>(entity =>
        {
            entity.HasKey(e => e.DiscountId).HasName("PRIMARY");

            entity.ToTable("discounts");

            entity.Property(e => e.DiscountId).HasColumnName("discount_id");
            entity.Property(e => e.Amount)
                .HasPrecision(10, 2)
                .HasColumnName("amount");
            entity.Property(e => e.Code)
                .HasMaxLength(50)
                .HasColumnName("code");
            entity.Property(e => e.DiscountType)
                .HasMaxLength(50)
                .HasColumnName("discount_type");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.IsActive)
                .HasDefaultValueSql("'1'")
                .HasColumnName("is_active");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("PRIMARY");

            entity.ToTable("notifications");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.NotificationId).HasColumnName("notification_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.IsRead)
                .HasDefaultValueSql("'0'")
                .HasColumnName("is_read");
            entity.Property(e => e.Message)
                .HasColumnType("text")
                .HasColumnName("message");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("notifications_ibfk_1");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.CartId, "cart_id");

            entity.HasIndex(e => e.ShippingId, "shipping_id");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.CartId).HasColumnName("cart_id");
            entity.Property(e => e.OrderStatus)
                .HasDefaultValueSql("'pending'")
                .HasColumnType("enum('pending','processing','shipped','delivered','canceled')")
                .HasColumnName("order_status");
            entity.Property(e => e.ShippingId).HasColumnName("shipping_id");
            entity.Property(e => e.TotalAmount)
                .HasPrecision(10, 2)
                .HasColumnName("total_amount");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Cart).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CartId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("orders_ibfk_3");

            entity.HasOne(d => d.Shipping).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ShippingId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("orders_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("orders_ibfk_1");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.OrderItemId).HasName("PRIMARY");

            entity.ToTable("order_items");

            entity.HasIndex(e => e.OrderId, "order_id");

            entity.HasIndex(e => e.ProductId, "product_id");

            entity.Property(e => e.OrderItemId).HasColumnName("order_item_id");
            entity.Property(e => e.Color)
                .HasMaxLength(225)
                .HasColumnName("color");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Price)
                .HasPrecision(10, 2)
                .HasColumnName("price");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.Size)
                .HasMaxLength(30)
                .HasColumnName("size");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("order_items_ibfk_1");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("order_items_ibfk_2");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PRIMARY");

            entity.ToTable("payments");

            entity.HasIndex(e => e.OrderId, "order_id");

            entity.HasIndex(e => e.TransactionId, "transaction_id");

            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.Amount)
                .HasPrecision(10, 2)
                .HasColumnName("amount");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.PaymentDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("payment_date");
            entity.Property(e => e.PaymentMethod)
                .HasColumnType("enum('credit_card','paypal','apple_pay')")
                .HasColumnName("payment_method");
            entity.Property(e => e.PaymentStatus)
                .HasDefaultValueSql("'pending'")
                .HasColumnType("enum('pending','completed','failed')")
                .HasColumnName("payment_status");
            entity.Property(e => e.TransactionId).HasColumnName("transaction_id");

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("payments_ibfk_1");

            entity.HasOne(d => d.Transaction).WithMany(p => p.Payments)
                .HasForeignKey(d => d.TransactionId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("payments_ibfk_2");
        });

        modelBuilder.Entity<PaymentGateway>(entity =>
        {
            entity.HasKey(e => e.GatewayId).HasName("PRIMARY");

            entity.ToTable("payment_gateways");

            entity.Property(e => e.GatewayId).HasColumnName("gateway_id");
            entity.Property(e => e.ApiKey)
                .HasMaxLength(255)
                .HasColumnName("api_key");
            entity.Property(e => e.ApiSecret)
                .HasMaxLength(255)
                .HasColumnName("api_secret");
            entity.Property(e => e.GatewayName)
                .HasMaxLength(255)
                .HasColumnName("gateway_name");
            entity.Property(e => e.GatewayType)
                .HasMaxLength(50)
                .HasColumnName("gateway_type");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PRIMARY");

            entity.ToTable("products");

            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Category)
                .HasMaxLength(100)
                .HasColumnName("category");
            entity.Property(e => e.Color)
                .HasMaxLength(50)
                .HasColumnName("color");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.ListColor)
                .HasMaxLength(2000)
                .HasColumnName("list_color");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Price)
                .HasPrecision(10, 2)
                .HasColumnName("price");
            entity.Property(e => e.PrimaryImage)
                .HasMaxLength(200)
                .HasColumnName("primary_image");
            entity.Property(e => e.ProMessageList)
                .HasColumnType("text")
                .HasColumnName("pro_message_list");
            entity.Property(e => e.ProductDescriptionCountryOrigin)
                .HasMaxLength(255)
                .HasColumnName("product_descriptionCountryOrigin");
            entity.Property(e => e.ProductDescriptionStyleColor)
                .HasMaxLength(255)
                .HasColumnName("product_descriptionStyleColor");
            entity.Property(e => e.Size)
                .HasMaxLength(100)
                .HasColumnName("size");
            entity.Property(e => e.Stock)
                .HasDefaultValueSql("'30'")
                .HasColumnName("stock");
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasKey(e => e.ReviewId).HasName("PRIMARY");

            entity.ToTable("reviews");

            entity.HasIndex(e => e.ProductId, "product_id");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.ReviewId).HasColumnName("review_id");
            entity.Property(e => e.Comment)
                .HasColumnType("text")
                .HasColumnName("comment");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ReviewDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("review_date");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Product).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("reviews_ibfk_1");

            entity.HasOne(d => d.User).WithMany(p => p.Reviews)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("reviews_ibfk_2");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PRIMARY");

            entity.ToTable("roles");

            entity.Property(e => e.RoleId).HasColumnName("role_id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<ShippingMethod>(entity =>
        {
            entity.HasKey(e => e.ShippingId).HasName("PRIMARY");

            entity.ToTable("shipping_methods");

            entity.Property(e => e.ShippingId).HasColumnName("shipping_id");
            entity.Property(e => e.Cost)
                .HasPrecision(10, 2)
                .HasColumnName("cost");
            entity.Property(e => e.EstimatedDeliveryTime)
                .HasMaxLength(255)
                .HasColumnName("estimated_delivery_time");
            entity.Property(e => e.MethodName)
                .HasMaxLength(255)
                .HasColumnName("method_name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.RoleId, "role_id");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasColumnName("phone");
            entity.Property(e => e.RoleId)
                .HasDefaultValueSql("'1'")
                .HasColumnName("role_id");
            entity.Property(e => e.UserImage)
                .HasMaxLength(200)
                .HasColumnName("user_image");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("users_ibfk_1");
        });

        modelBuilder.Entity<UserAddress>(entity =>
        {
            entity.HasKey(e => e.AddressId).HasName("PRIMARY");

            entity.ToTable("user_addresses");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.AddressId).HasColumnName("address_id");
            entity.Property(e => e.AddressLine)
                .HasMaxLength(255)
                .HasColumnName("address_line");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.Country)
                .HasMaxLength(100)
                .HasColumnName("country");
            entity.Property(e => e.PostalCode)
                .HasMaxLength(20)
                .HasColumnName("postal_code");
            entity.Property(e => e.State)
                .HasMaxLength(100)
                .HasColumnName("state");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserAddresses)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("user_addresses_ibfk_1");
        });

        modelBuilder.Entity<Wishlist>(entity =>
        {
            entity.HasKey(e => e.WishlistId).HasName("PRIMARY");

            entity.ToTable("wishlists");

            entity.HasIndex(e => e.ProductId, "product_id");

            entity.HasIndex(e => e.UserId, "user_id");

            entity.Property(e => e.WishlistId).HasColumnName("wishlist_id");
            entity.Property(e => e.ProductId).HasColumnName("product_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Product).WithMany(p => p.Wishlists)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("wishlists_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Wishlists)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("wishlists_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
