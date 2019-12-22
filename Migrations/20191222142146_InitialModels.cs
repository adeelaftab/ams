using Microsoft.EntityFrameworkCore.Migrations;

namespace AppSystem.Migrations
{
    public partial class InitialModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "buildings",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 150, nullable: false),
                    floors = table.Column<int>(nullable: false),
                    address = table.Column<string>(maxLength: 255, nullable: false),
                    location = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_buildings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "countries",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 150, nullable: false),
                    CountryCode = table.Column<string>(maxLength: 5, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_countries", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "flatTypes",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 150, nullable: false),
                    bath = table.Column<float>(nullable: false),
                    room = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_flatTypes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "nationalities",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_nationalities", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "cities",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 150, nullable: false),
                    Countryid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cities", x => x.id);
                    table.ForeignKey(
                        name: "FK_cities_countries_Countryid",
                        column: x => x.Countryid,
                        principalTable: "countries",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "flats",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 150, nullable: false),
                    floor = table.Column<int>(nullable: false),
                    flatno = table.Column<int>(nullable: false),
                    BuildingId = table.Column<int>(nullable: false),
                    FlatTypeid = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_flats", x => x.id);
                    table.ForeignKey(
                        name: "FK_flats_buildings_BuildingId",
                        column: x => x.BuildingId,
                        principalTable: "buildings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_flats_flatTypes_FlatTypeid",
                        column: x => x.FlatTypeid,
                        principalTable: "flatTypes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "renters",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 150, nullable: false),
                    phone = table.Column<string>(maxLength: 15, nullable: false),
                    email = table.Column<string>(nullable: true),
                    address = table.Column<string>(maxLength: 255, nullable: false),
                    Cityid = table.Column<int>(nullable: false),
                    Countryid = table.Column<int>(nullable: false),
                    Nationalityid = table.Column<int>(nullable: false),
                    Identification = table.Column<string>(nullable: false),
                    Details = table.Column<string>(nullable: true),
                    TotalGuests = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_renters", x => x.id);
                    table.ForeignKey(
                        name: "FK_renters_cities_Cityid",
                        column: x => x.Cityid,
                        principalTable: "cities",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_renters_countries_Countryid",
                        column: x => x.Countryid,
                        principalTable: "countries",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_renters_nationalities_Nationalityid",
                        column: x => x.Nationalityid,
                        principalTable: "nationalities",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "medias",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 150, nullable: false),
                    link = table.Column<string>(maxLength: 255, nullable: false),
                    Flatid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_medias", x => x.id);
                    table.ForeignKey(
                        name: "FK_medias_flats_Flatid",
                        column: x => x.Flatid,
                        principalTable: "flats",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_cities_Countryid",
                table: "cities",
                column: "Countryid");

            migrationBuilder.CreateIndex(
                name: "IX_flats_BuildingId",
                table: "flats",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_flats_FlatTypeid",
                table: "flats",
                column: "FlatTypeid");

            migrationBuilder.CreateIndex(
                name: "IX_medias_Flatid",
                table: "medias",
                column: "Flatid");

            migrationBuilder.CreateIndex(
                name: "IX_renters_Cityid",
                table: "renters",
                column: "Cityid");

            migrationBuilder.CreateIndex(
                name: "IX_renters_Countryid",
                table: "renters",
                column: "Countryid");

            migrationBuilder.CreateIndex(
                name: "IX_renters_Nationalityid",
                table: "renters",
                column: "Nationalityid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "medias");

            migrationBuilder.DropTable(
                name: "renters");

            migrationBuilder.DropTable(
                name: "flats");

            migrationBuilder.DropTable(
                name: "cities");

            migrationBuilder.DropTable(
                name: "nationalities");

            migrationBuilder.DropTable(
                name: "buildings");

            migrationBuilder.DropTable(
                name: "flatTypes");

            migrationBuilder.DropTable(
                name: "countries");
        }
    }
}
