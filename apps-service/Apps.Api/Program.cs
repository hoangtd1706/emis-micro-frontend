using Apps.Api.Infrastructure;
using Ecoba.Microservice.ServiceDiscovery.Consul;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration["ConnectionString"]));

builder.Services.AddConsul(builder.Configuration.GetServiceConfig());

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

InitializeDatabase(app);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

void InitializeDatabase(IApplicationBuilder app)
{
    var serviceScopeFactory = app.ApplicationServices.GetService<IServiceScopeFactory>();
    if (serviceScopeFactory != null)
    {
        using var scope = serviceScopeFactory.CreateScope();
        scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();
    }
}
