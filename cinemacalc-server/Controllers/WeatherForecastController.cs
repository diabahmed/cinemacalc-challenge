using CinemaCalcServer.Data.DTOs.WeatherForecast;
using CinemaCalcServer.Models;
using CinemaCalcServer.Services.WeatherForecasts;
using Microsoft.AspNetCore.Mvc;

namespace CinemaCalcServer.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IWeatherForecastService _weatherForecastService;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(IWeatherForecastService weatherForecastService, ILogger<WeatherForecastController> logger)
        {
            _weatherForecastService = weatherForecastService;
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            return await _weatherForecastService.GetWeatherForecastsAsync();
        }

        [HttpGet("{id}", Name = "GetWeatherForecastById")]
        public async Task<ActionResult<WeatherForecast>> GetById(int id)
        {
            try
            {
                var weatherForecast = await _weatherForecastService.GetWeatherForecastByIdAsync(id);
                return Ok(weatherForecast);
            }
            catch (KeyNotFoundException)
            {
                _logger.LogError($"WeatherForecast with id {id} not found.");
                return NotFound();
            }
        }

        [HttpPost(Name = "CreateWeatherForecast")]
        public async Task<ActionResult<WeatherForecast>> Post([FromBody] WeatherForecastInput dto)
        {
            var weatherForecast = new WeatherForecast
            {
                Date = dto.Date,
                TemperatureC = dto.TemperatureC,
                Summary = dto.Summary
            };

            var newWeatherForecast = await _weatherForecastService.CreateWeatherForecastAsync(weatherForecast);
            return CreatedAtAction(nameof(GetById), new { id = newWeatherForecast.Id }, newWeatherForecast);
        }

        [HttpPut("{id}", Name = "UpdateWeatherForecast")]
        public async Task<ActionResult<WeatherForecast>> Put(int id, [FromBody] WeatherForecastInput dto)
        {
            try
            {
                var weatherForecast = new WeatherForecast
                {
                    Date = dto.Date,
                    TemperatureC = dto.TemperatureC,
                    Summary = dto.Summary
                };

                var updatedWeatherForecast = await _weatherForecastService.UpdateWeatherForecastAsync(id, weatherForecast);
                return Ok(updatedWeatherForecast);
            }
            catch (KeyNotFoundException)
            {
                _logger.LogError($"WeatherForecast with id {id} not found.");
                return NotFound();
            }
        }

        [HttpDelete("{id}", Name = "DeleteWeatherForecast")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _weatherForecastService.DeleteWeatherForecastAsync(id);
            if (!result)
            {
                _logger.LogError($"WeatherForecast with id {id} not found.");
                return NotFound();
            }
            return NoContent();
        }
    }
}
