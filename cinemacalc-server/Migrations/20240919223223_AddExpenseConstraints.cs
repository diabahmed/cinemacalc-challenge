using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CinemaCalcServer.Migrations
{
    /// <inheritdoc />
    public partial class AddExpenseConstraints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add check constraint for PercentageMarkup
            migrationBuilder.AddCheckConstraint(
                name: "CK_Expenses_PercentageMarkup_Range",
                table: "Expenses",
                sql: "\"PercentageMarkup\" >= 0 AND \"PercentageMarkup\" <= 100"
            );

            // Add check constraint to ensure Name is not an empty string
            migrationBuilder.AddCheckConstraint(
                name: "CK_Expenses_Name_NotEmpty",
                table: "Expenses",
                sql: "LENGTH(TRIM(\"Name\")) > 0"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove the check constraints
            migrationBuilder.DropCheckConstraint(
                name: "CK_Expenses_PercentageMarkup_Range",
                table: "Expenses"
            );

            migrationBuilder.DropCheckConstraint(
                name: "CK_Expenses_Name_NotEmpty",
                table: "Expenses"
            );
        }
    }
}
