using CinemaCalcServer.Models;

namespace CinemaCalcServer.Services.Expenses
{
    public interface IExpenseService
    {
        Task<Expense> CreateExpenseAsync(Expense expense);
        Task<IEnumerable<Expense>> GetAllExpensesAsync();
        Task<Expense> GetExpenseByIdAsync(int id);
        Task<Expense> UpdateExpenseAsync(int id, Expense expense);
        Task<bool> DeleteExpenseAsync(int id);
    }
}
