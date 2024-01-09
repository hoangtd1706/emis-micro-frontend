using Apps.Api.Infrastructure;
using Apps.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Apps.Api.EntityConfigurations;

public class ApplicationConf : IEntityTypeConfiguration<Application>
{
  public void Configure(EntityTypeBuilder<Application> conf)
  {
    conf.ToTable("applications", AppDbContext.DEFAULT_SCHEMA);

    conf.Property(c => c.Id)
      .HasColumnName("id")
      .ValueGeneratedOnAdd()
      .IsRequired();

    conf.Property(c => c.AppName)
      .HasColumnName("app_name")
      .IsRequired();

    conf.Property(c => c.AppPath)
    .HasColumnName("app_path")
    .IsRequired();

    conf.Property(c => c.AppIcon)
    .HasColumnName("app_icon")
    .IsRequired();

    conf.Property(c => c.RemoteName)
      .HasColumnName("remote_name")
      .IsRequired();

    conf.Property(c => c.RemoteEntry)
    .HasColumnName("remote_entry")
    .IsRequired();

    conf.Property(c => c.AppExposedModule)
    .HasColumnName("app_exposed_module")
    .IsRequired();

    conf.Property(c => c.Order)
    .HasColumnName("order");
  }
}
