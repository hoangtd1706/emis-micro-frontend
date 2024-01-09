using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Apps.Api.Migrations
{
    /// <inheritdoc />
    public partial class Initialdatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "apps");

            migrationBuilder.EnsureSchema(
                name: "base_service");

            migrationBuilder.CreateTable(
                name: "applications",
                schema: "apps",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    appname = table.Column<string>(name: "app_name", type: "text", nullable: false),
                    remotename = table.Column<string>(name: "remote_name", type: "text", nullable: false),
                    remoteentry = table.Column<string>(name: "remote_entry", type: "text", nullable: false),
                    apppath = table.Column<string>(name: "app_path", type: "text", nullable: false),
                    appexposedmodule = table.Column<string>(name: "app_exposed_module", type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_applications", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user_roles",
                schema: "base_service",
                columns: table => new
                {
                    usernumber = table.Column<string>(name: "user_number", type: "text", nullable: false),
                    role = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_roles", x => new { x.usernumber, x.role });
                });

            migrationBuilder.CreateIndex(
                name: "IX_user_roles_user_number_role",
                schema: "base_service",
                table: "user_roles",
                columns: new[] { "user_number", "role" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "applications",
                schema: "apps");

            migrationBuilder.DropTable(
                name: "user_roles",
                schema: "base_service");
        }
    }
}
