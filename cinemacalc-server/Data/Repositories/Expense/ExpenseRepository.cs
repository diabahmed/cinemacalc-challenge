using CinemaCalcServer.Models;
using Microsoft.EntityFrameworkCore;

namespace CinemaCalcServer.Data.Repositories
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly CinemaCalcDbContext _dbContext;

        public ExpenseRepository(CinemaCalcDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Expense> CreateExpenseAsync(Expense expense)
        {
            await _dbContext.Expenses.AddAsync(expense);
            await _dbContext.SaveChangesAsync();
            return expense;
        }

        public async Task<IEnumerable<Expense>> GetAllExpensesAsync()
        {
            return await _dbContext.Expenses.ToListAsync();
        }

        public async Task<Expense> GetExpenseByIdAsync(int id)
        {
            var expense = await _dbContext.Expenses.FindAsync(id);
            if (expense == null)
                throw new KeyNotFoundException();

            return expense;
        }

        public async Task<Expense> UpdateExpenseAsync(Expense expense)
        {
            _dbContext.Entry(expense).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return expense;
        }

        public async Task<bool> DeleteExpenseAsync(int id)
        {
            var expense = await _dbContext.Expenses.FindAsync(id);
            if (expense == null)
                return false;

            _dbContext.Expenses.Remove(expense);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
