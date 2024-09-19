using CinemaCalcServer.Models;
using CinemaCalcServer.Data.Repositories;

namespace CinemaCalcServer.Services.WeatherForecasts
{
    public class WeatherForecastService : IWeatherForecastService
    {
        private readonly IWeatherForecastRepository _repository;

        public WeatherForecastService(IWeatherForecastRepository repository)
        {
            _repository = repository;
        }

        public async Task<WeatherForecast> CreateWeatherForecastAsync(WeatherForecast weatherForecast)
        {
            return await _repository.CreateWeatherForecastAsync(weatherForecast);
        }

        public async Task<IEnumerable<WeatherForecast>> GetWeatherForecastsAsync()
        {
            return await _repository.GetWeatherForecastsAsync();
        }

        public async Task<WeatherForecast> GetWeatherForecastByIdAsync(int id)
        {
            return await _repository.GetWeatherForecastByIdAsync(id);
        }

        public async Task<WeatherForecast> UpdateWeatherForecastAsync(int id, WeatherForecast weatherForecast)
        {
            return await _repository.UpdateWeatherForecastAsync(id, weatherForecast);
        }

        public async Task<bool> DeleteWeatherForecastAsync(int id)
        {
            return await _repository.DeleteWeatherForecastAsync(id);
        }
    }
}
