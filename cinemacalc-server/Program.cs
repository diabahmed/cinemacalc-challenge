using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Diagnostics;
using CinemaCalcServer.Data;
using CinemaCalcServer.Data.Repositories;
using CinemaCalcServer.Services.Expenses;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<CinemaCalcDbContext>(options => options.UseNpgsql(connectionString));

// Register repositories and services for dependency injection
builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();

// Register CORS policy to allow requests from React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendCors", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseCors("FrontendCors");

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

app.UseRouting();
app.UseAuthorization();
app.MapControllers();

// Test database connection on startup and apply migrations if successful
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<CinemaCalcDbContext>();
    var testConnection = dbContext.Database.CanConnect();
    if (testConnection)
    {
        Console.WriteLine("✅ Database connection successful ✅");
        dbContext.Database.Migrate();
    }
    else
    {
        Console.WriteLine("❌ Database connection failed ❌");
        return;
    }
}

app.Run();
