namespace CinemaCalcServer.Data.DTOs.WeatherForecast
{
    public record WeatherForecastInput
    {
        public DateOnly Date { get; set; }
        public int TemperatureC { get; set; }
        public string? Summary { get; set; }
    }
}
