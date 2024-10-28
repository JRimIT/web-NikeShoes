using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NikeShoeStore.Data;
using NikeShoeStore.Models;
using NikeShoeStore.Service;
using System.ComponentModel;
using System.Configuration;
using System.Globalization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Text;

namespace NikeShoeStore.Controllers
{
    [Route("api/paypal")]
    [ApiController]
    public class PayPalController : Controller
    {
        private readonly PayPalService _payPalService;
        private readonly ILogger<PayPalController> _logger;
        private readonly NikeShoeStoreDbContext _context;
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public PayPalController(PayPalService payPalService, ILogger<PayPalController> logger, NikeShoeStoreDbContext context, IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            _payPalService = payPalService;
            _logger = logger;
            _context = context;
            _clientFactory = clientFactory;
            _configuration = configuration;
            _httpClient = new HttpClient();
        }

        [HttpPost("order")]
        public async Task<IActionResult> CreateOrder(decimal amount)
        {
            var reference = GetRandomInvoiceNumber();
            //var total = decimal.Parse(amount).ToString("F2");
            var total = amount.ToString("F2", CultureInfo.InvariantCulture);
            var orderId = await _payPalService.CreateOrderAsync(total, reference);
            return Ok(orderId);
        }

        [HttpPost("capture")]
        public async Task<IActionResult> CaptureOrder(string orderId)
        {
            try
            {
                var result = await _payPalService.CaptureOrderAsync(orderId);
                Console.WriteLine(result.ToString());

                if (result == null) 
                    return BadRequest(new { error = "Order capture failed." });
                return Ok(new { result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
            
        }

        //[HttpPost("order")]
        //public async Task<ActionResult> CreateOrder(decimal total, CancellationToken cancellationToken)
        //{
        //    //if (cart == null || !cart.Any())
        //    //{
        //    //    return BadRequest("Cart cannot be null or empty");
        //    //}
        //    //if (request.TotalAmount <= 0)
        //    //{
        //    //    return BadRequest("Total amount must be greater than zero");
        //    //}
        //    try
        //    {
        //        //var totalAmount = (cart.Product.Price * cart.Quantity).ToString();
        //        //var totalAmount = cart.Sum(item => item.Product.Price * item.Quantity).ToString();
        //        //TotalAmount = request.TotalAmount.ToString();
        //        TotalAmount = total.ToString();
        //        TempData["TotalAmount"] = TotalAmount;
        //        var currency = "USD";
        //        var reference = GetRandomInvoiceNumber();
        //        var response = await _payPalService.CreateOrder(TotalAmount, currency, reference);
        //        if (response == null || string.IsNullOrEmpty(response.id))
        //        {
        //            return BadRequest("Invalid response from PayPal service");
        //        }
        //        //_logger.LogInformation("Creating order with data: {data}", cart);
        //        //_logger.LogInformation($"Received total: {request.TotalAmount}", request.TotalAmount);
        //        _logger.LogInformation($"PayPal order response: {response}", response);
        //        await _context.SaveChangesAsync();
        //        return Ok(response); // Return the PayPal order response
        //    }
        //    catch (System.Exception ex)
        //    {
        //        _logger.LogError(ex, "Error while creating PayPal order");
        //        return StatusCode(500, "Internal Server Error" + ex.Message);
        //    }
        //}

        //[HttpPost("capture")]
        //public async Task<IActionResult> Capture(string orderId, CancellationToken cancellationToken)
        //{
        //    try
        //    {
        //        var response = await _payPalService.CaptureOrder(orderId);

        //        var reference = response.purchase_units[0].reference_id;

        //        // Put your logic to save the transaction here
        //        // You can use the "reference" variable as a transaction key
        //        _logger.LogInformation("PayPal order response: {response}", response);

        //        return Ok(response);
        //    }
        //    catch (Exception e)
        //    {
        //        var error = new
        //        {
        //            e.GetBaseException().Message
        //        };

        //        return StatusCode(500, "Internal Server Error" + e.Message);
        //    }
        //}

        private string GetRandomInvoiceNumber()
        {
            return new Random().Next(999999).ToString();
        }
    }
}
