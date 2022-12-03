using OH_Assessment;
using Microsoft.EntityFrameworkCore;
using OH_Assessment.Data;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        builder.Services.AddDbContext<OrderContext>(opts => opts.UseSqlServer(builder.Configuration.GetConnectionString("MyDatabase")));
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Logging.AddLog4Net("log4net.config");

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<OrderContext>();
            context.Database.EnsureCreated();
            DbDataInitializer.Initialize(context);
        }

        app.UseDefaultFiles();

        app.UseStaticFiles();

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}