using CinemaCalcServer.Models;

namespace CinemaCalcServer.Services.WeatherForecasts
{
    public interface IWeatherForecastService
    {
        Task<IEnumerable<WeatherForecast>> GetWeatherForecastsAsync();
        Task<WeatherForecast> GetWeatherForecastByIdAsync(int id);
        Task<WeatherForecast> CreateWeatherForecastAsync(WeatherForecast weatherForecast);
        Task<WeatherForecast> UpdateWeatherForecastAsync(int id, WeatherForecast weatherForecast);
        Task<bool> DeleteWeatherForecastAsync(int id);
    }
}
