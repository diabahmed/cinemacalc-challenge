namespace CinemaCalcServer.Data.DTOs.Expense
{
    public record ExpenseInput
    {
        public required string Name { get; init; }
        public required decimal Price { get; init; }
        public required decimal PercentageMarkup { get; init; }
    }
}
