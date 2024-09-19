using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Diagnostics;
using CinemaCalcServer.Data;
using CinemaCalcServer.Services.WeatherForecasts;
using CinemaCalcServer.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configure the container's services
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<CinemaCalcDbContext>(options => options.UseNpgsql(connectionString));

builder.Services.AddScoped<IWeatherForecastRepository, WeatherForecastRepository>();
builder.Services.AddScoped<IWeatherForecastService, WeatherForecastService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyCorsPolicy");

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
        if (exception != null)
        {
            Console.WriteLine(exception);
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsync("An internal server error occurred.");
        }
    });
});

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

// Test database connection on startup and apply migrations if successful
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<CinemaCalcDbContext>();
    var testConnection = dbContext.Database.CanConnect();
    Console.WriteLine($"Database connection successful: {testConnection}");
    if (testConnection)
    {
        dbContext.Database.Migrate();
    }
}

app.Run();
