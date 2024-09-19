using Microsoft.EntityFrameworkCore;
using CinemaCalcServer.Models;
using CinemaCalcServer.Data;

namespace CinemaCalcServer.Services.WeatherForecasts
{
    public class WeatherForecastService : IWeatherForecastService
    {
        private readonly CinemaCalcDbContext _dbContext;

        public WeatherForecastService(CinemaCalcDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<WeatherForecast> CreateWeatherForecastAsync(WeatherForecast weatherForecast)
        {
            await _dbContext.WeatherForecasts.AddAsync(weatherForecast);
            await _dbContext.SaveChangesAsync();
            return weatherForecast;
        }

        public async Task<IEnumerable<WeatherForecast>> GetWeatherForecastsAsync()
        {
            return await _dbContext.WeatherForecasts.ToListAsync();
        }

        public async Task<WeatherForecast> GetWeatherForecastByIdAsync(int id)
        {
            var weatherForecast = await _dbContext.WeatherForecasts.FindAsync(id);
            if (weatherForecast == null)
            {
                throw new KeyNotFoundException($"WeatherForecast with id {id} not found.");
            }
            return weatherForecast;
        }

        public async Task<WeatherForecast> UpdateWeatherForecastAsync(int id, WeatherForecast weatherForecast)
        {
            var existingWeatherForecast = await _dbContext.WeatherForecasts.FindAsync(id);
            if (existingWeatherForecast == null)
            {
                throw new KeyNotFoundException($"WeatherForecast with id {id} not found.");
            }

            existingWeatherForecast.Date = weatherForecast.Date;
            existingWeatherForecast.TemperatureC = weatherForecast.TemperatureC;
            existingWeatherForecast.Summary = weatherForecast.Summary;

            _dbContext.WeatherForecasts.Update(existingWeatherForecast);
            await _dbContext.SaveChangesAsync();
            return existingWeatherForecast;
        }

        public async Task<bool> DeleteWeatherForecastAsync(int id)
        {
            var weatherForecast = await _dbContext.WeatherForecasts.FindAsync(id);
            if (weatherForecast == null)
            {
                return false;
            }

            _dbContext.WeatherForecasts.Remove(weatherForecast);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
