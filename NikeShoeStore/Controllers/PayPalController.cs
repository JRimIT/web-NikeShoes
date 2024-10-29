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
                if (string.IsNullOrEmpty(orderId))
                {
                    return BadRequest(new { error = "Order ID cannot be null or empty." });
                }

                var result = await _payPalService.CaptureOrderAsync(orderId);
                Console.WriteLine("result: " + result);

                if (result == null)
                    return BadRequest(new { error = "Order capture failed." });
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error capturing order: " + ex.Message);
                return StatusCode(500, new { error = ex.Message });
            }

        }
        private string GetRandomInvoiceNumber()
        {
            return new Random().Next(999999).ToString();
        }
    }
}
