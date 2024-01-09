using System.ComponentModel.DataAnnotations;

namespace Apps.Api.Models;

public class Application
{
    [Key]
    public string Id { get; set; }
    public string AppName { get; set; }
    public string RemoteName { get; set; }
    public string RemoteEntry { get; set; }
    public string AppPath { get; set; }
    public string AppExposedModule { get; set; }
    public string AppIcon { get; set; }
    public int? Order { get; set; }
}