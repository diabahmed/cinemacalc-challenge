using CinemaCalcServer.Models;

namespace CinemaCalcServer.Data.Repositories
{
    public interface IWeatherForecastRepository
    {
        Task<IEnumerable<WeatherForecast>> GetWeatherForecastsAsync();
        Task<WeatherForecast> GetWeatherForecastByIdAsync(int id);
        Task<WeatherForecast> CreateWeatherForecastAsync(WeatherForecast weatherForecast);
        Task<WeatherForecast> UpdateWeatherForecastAsync(int id, WeatherForecast weatherForecast);
        Task<bool> DeleteWeatherForecastAsync(int id);
    }
}
