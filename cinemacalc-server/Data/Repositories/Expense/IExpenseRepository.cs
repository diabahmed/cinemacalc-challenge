using CinemaCalcServer.Models;

namespace CinemaCalcServer.Data.Repositories
{
    public interface IExpenseRepository
    {
        Task<Expense> CreateExpenseAsync(Expense expense);
        Task<IEnumerable<Expense>> GetAllExpensesAsync();
        Task<Expense> GetExpenseByIdAsync(int id);
        Task<Expense> UpdateExpenseAsync(Expense expense);
        Task<bool> DeleteExpenseAsync(int id);
    }
}
