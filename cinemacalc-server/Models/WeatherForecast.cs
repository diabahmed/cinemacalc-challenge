using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CinemaCalcServer.Models;

public class WeatherForecast
{
    public WeatherForecast()
    {
    }

    public WeatherForecast(int id, DateOnly date, int temperatureC, string? summary)
    {
        Id = id;
        Date = date;
        TemperatureC = temperatureC;
        Summary = summary;
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public DateOnly Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string? Summary { get; set; }
}
