using CinemaCalcServer.Data.DTOs.Expense;
using CinemaCalcServer.Models;
using CinemaCalcServer.Services.Expenses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CinemaCalcServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        private readonly ILogger<ExpensesController> _logger;

        public ExpensesController(IExpenseService expenseService, ILogger<ExpensesController> logger)
        {
            _expenseService = expenseService;
            _logger = logger;
        }

        [HttpPost(Name = "CreateExpense")]
        public async Task<ActionResult<Expense>> CreateExpense([FromBody] ExpenseInput expenseDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var expense = new Expense
            {
                Name = expenseDTO.Name,
                Price = expenseDTO.Price,
                PercentageMarkup = expenseDTO.PercentageMarkup
            };

            try
            {
                var createdExpense = await _expenseService.CreateExpenseAsync(expense);
                return CreatedAtAction(nameof(GetExpense), new { id = createdExpense.Id }, createdExpense);
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is Npgsql.PostgresException pgEx)
                {
                    switch (pgEx.SqlState)
                    {
                        case "23514":
                            return BadRequest("Invalid data: Check constraint violation. Please check the data and try again.");
                        case "22003":
                            return BadRequest("Invalid data: Numeric value out of range.");
                        default:
                            return StatusCode(500, "An error occurred while saving the expense.");
                    }
                }
                return StatusCode(500, "An unexpected error occurred while saving the expense.");
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpGet(Name = "GetExpenses")]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            var expenses = await _expenseService.GetAllExpensesAsync();
            return Ok(expenses);
        }

        [HttpGet("{id}", Name = "GetExpense")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
            try
            {
                var expense = await _expenseService.GetExpenseByIdAsync(id);
                return Ok(expense);
            }
            catch (KeyNotFoundException)
            {
                _logger.LogError($"Expense with id {id} not found.");
                return NotFound();
            }
        }

        [HttpPut("{id}", Name = "UpdateExpense")]
        public async Task<IActionResult> UpdateExpense(int id, [FromBody] ExpenseInput expenseDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var expense = new Expense
            {
                Name = expenseDTO.Name,
                Price = expenseDTO.Price,
                PercentageMarkup = expenseDTO.PercentageMarkup
            };

            try
            {
                var updatedExpense = await _expenseService.UpdateExpenseAsync(id, expense);
                return Ok(updatedExpense);
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is Npgsql.PostgresException pgEx)
                {
                    switch (pgEx.SqlState)
                    {
                        case "23514":
                            return BadRequest("Invalid data: Check constraint violation. Please check the data and try again.");
                        case "22003":
                            return BadRequest("Invalid data: Numeric value out of range.");
                        default:
                            return StatusCode(500, "An error occurred while saving the expense.");
                    }
                }
                return StatusCode(500, "An unexpected error occurred while saving the expense.");
            }
            catch (KeyNotFoundException)
            {
                _logger.LogError($"Expense with id {id} not found.");
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpDelete("{id}", Name = "DeleteExpense")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var isDeleted = await _expenseService.DeleteExpenseAsync(id);
            if (!isDeleted)
            {
                _logger.LogError($"Expense with id {id} not found.");
                return NotFound();
            }

            return NoContent();
        }
    }
}
