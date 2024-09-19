using CinemaCalcServer.Models;
using CinemaCalcServer.Data.Repositories;

namespace CinemaCalcServer.Services.Expenses
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpenseService(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        public async Task<Expense> CreateExpenseAsync(Expense expense)
        {
            return await _expenseRepository.CreateExpenseAsync(expense);
        }

        public Task<IEnumerable<Expense>> GetAllExpensesAsync()
        {
            return _expenseRepository.GetAllExpensesAsync();
        }

        public async Task<Expense> GetExpenseByIdAsync(int id)
        {
            return await _expenseRepository.GetExpenseByIdAsync(id);
        }

        public async Task<Expense> UpdateExpenseAsync(int id, Expense expense)
        {
            var existingExpense = await _expenseRepository.GetExpenseByIdAsync(id);
            if (existingExpense == null)
                throw new KeyNotFoundException();

            existingExpense.Name = expense.Name;
            existingExpense.Price = expense.Price;
            existingExpense.PercentageMarkup = expense.PercentageMarkup;

            return await _expenseRepository.UpdateExpenseAsync(existingExpense);
        }

        public async Task<bool> DeleteExpenseAsync(int id)
        {
            return await _expenseRepository.DeleteExpenseAsync(id);
        }
    }
}
