namespace NikeShoeStore.Service
{
    public class PayPalSettings
    {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string ApiBaseUrl { get; set; }
        //public string BaseUrl => Mode == "Live"
        //    ? "https://api-m.paypal.com"
        //    : "https://api-m.sandbox.paypal.com";
        //string clientId, string clientSecret, string mode,
    }
}
