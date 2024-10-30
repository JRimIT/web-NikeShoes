using Microsoft.EntityFrameworkCore;
using NikeShoeStore.Data;
using NikeShoeStore.Service;    

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext
builder.Services.AddDbContext<NikeShoeStoreDbContext>(options =>
{
    options.UseMySql(builder.Configuration.GetConnectionString("NikeShoeStoreConnectionString"),
    Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.39-mysql"));
});

// Configure PayPalService

builder.Services.Configure<PayPalSettings>(builder.Configuration.GetSection("PayPalSettings"));
builder.Services.AddHttpClient<PayPalService>();
builder.Services.AddSingleton("PayPalSettings");

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()  // Adjust this for production
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

// Use HTTPS Redirection
app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowAll");

// Enable Authorization
app.UseAuthorization();

// Map controllers
app.MapControllers();

app.Run();
