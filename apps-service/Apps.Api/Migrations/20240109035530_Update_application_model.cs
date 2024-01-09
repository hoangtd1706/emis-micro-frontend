using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Apps.Api.Migrations
{
    /// <inheritdoc />
    public partial class Updateapplicationmodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "app_icon",
                schema: "apps",
                table: "applications",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "order",
                schema: "apps",
                table: "applications",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "app_icon",
                schema: "apps",
                table: "applications");

            migrationBuilder.DropColumn(
                name: "order",
                schema: "apps",
                table: "applications");
        }
    }
}
