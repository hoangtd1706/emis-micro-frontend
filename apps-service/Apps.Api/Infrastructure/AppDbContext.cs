using System.Data;
using Apps.Api.EntityConfigurations;
using Apps.Api.Models;
using Ecoba.Microservice.BaseService.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Storage;

namespace Apps.Api.Infrastructure;
public class AppDbContext : BaseDbContext
{
  public const string DEFAULT_SCHEMA = "apps";

  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

  public DbSet<Application> Applications { get; set; }

  private IDbContextTransaction _currentTransaction;
  public IDbContextTransaction GetCurrentTransaction() => _currentTransaction;

  public bool HasActiveTransaction => _currentTransaction != null;
  public async Task<bool> SaveEntitiesAsync(CancellationToken cancellationToken = default(CancellationToken))
  {
    // After executing this line all the changes (from the Command Handler and Domain Event Handlers) 
    // performed through the DbContext will be committed
    var result = await base.SaveChangesAsync(cancellationToken);

    return true;
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.ApplyConfiguration(new ApplicationConf());
  }

  public async Task<IDbContextTransaction> BeginTransactionAsync()
  {
    if (_currentTransaction != null) return null;

    _currentTransaction = await Database.BeginTransactionAsync(IsolationLevel.ReadCommitted);

    return _currentTransaction;
  }

  public async Task CommitTransactionAsync(IDbContextTransaction transaction)
  {
    if (transaction == null) throw new ArgumentNullException(nameof(transaction));
    if (transaction != _currentTransaction) throw new InvalidOperationException($"Transaction {transaction.TransactionId} is not current");

    try
    {
      await SaveChangesAsync();
      transaction.Commit();
    }
    catch
    {
      RollbackTransaction();
      throw;
    }
    finally
    {
      if (_currentTransaction != null)
      {
        _currentTransaction.Dispose();
        _currentTransaction = null;
      }
    }
  }

  public void RollbackTransaction()
  {
    try
    {
      _currentTransaction?.Rollback();
    }
    finally
    {
      if (_currentTransaction != null)
      {
        _currentTransaction.Dispose();
        _currentTransaction = null;
      }
    }
  }
}

public class ReportDbContextDesignFactory : IDesignTimeDbContextFactory<AppDbContext>
{
  public AppDbContext CreateDbContext(string[] args)
  {
    var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>()
        .UseNpgsql("Host=postgres;Port=5432;Username=postgres;Password=Ecoba@2020;Database=apps-service");

    return new AppDbContext(optionsBuilder.Options);
  }
}