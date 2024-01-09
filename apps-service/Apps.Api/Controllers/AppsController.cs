using Apps.Api.Infrastructure;
using Apps.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Apps.Api.Controllers;

[ApiController]
[Route("api/v1/apps")]
public class AppsController : ControllerBase
{
    private readonly AppDbContext _context;

    public AppsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateApp([FromBody] AppModelCreate model)
    {
        var app = new Application()
        {
            AppName = model.AppName,
            AppPath = model.RemoteName,
            RemoteName = model.RemoteName,
            RemoteEntry = model.RemoteEntry,
            AppExposedModule = "ReactAppLoader",
            AppIcon = model.AppIcon,
            Order = model.Order
        };
        try
        {
            _context.Applications.Add(app);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            System.Console.WriteLine("Err {0}", ex.ToString());
            return BadRequest();
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = new List<AppModelView>();
        var apps = await _context.Applications.OrderBy(x => x.Order).ToListAsync();
        var index = 0;
        foreach (var app in apps)
        {
            index++;
            result.Add(new AppModelView()
            {
                AppName = app.AppName,
                RemoteName = app.RemoteName,
                RemoteEntry = app.RemoteEntry,
                ExposedModule = app.AppExposedModule,
                Index = app.Order ?? index,
                AppIcon = app.AppIcon
            });
        }
        return Ok(result);
    }
}

public record AppModelView
{
    public string AppName { get; set; }
    public string RemoteName { get; set; }
    public string RemoteEntry { get; set; }
    public string ExposedModule { get; set; }
    public string AppIcon { get; set; }
    public int Index { get; set; }
}

public record AppModelCreate
{
    public string AppName { get; set; }
    public string RemoteName { get; set; }
    public string RemoteEntry { get; set; }
    public string AppExposedModule { get; set; }
    public string AppIcon { get; set; }
    public int Order { get; set; }
}