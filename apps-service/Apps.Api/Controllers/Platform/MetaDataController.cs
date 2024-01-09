using Microsoft.AspNetCore.Mvc;

namespace Apps.Api.Controllers.Platform;

[ApiController]
[Route("api/v1/meta-data")]
public class MetaDataController : ControllerBase
{
  private readonly IConfiguration _conf;
  public MetaDataController(IConfiguration conf)
  {
    _conf = conf;
  }

  [HttpGet("version")]
  public IActionResult GetVersion()
  {
    var version = _conf.GetSection("Version").Get<string>();
    if (version == null)
      return BadRequest("Can not get version information!");

    return Ok(version);
  }
}