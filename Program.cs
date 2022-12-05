using OH_Assessment;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using OH_Assessment.Data;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Identity.Client;

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
        /* For future use when using a react app for ui
        builder.Services.AddSpaStaticFiles(configuration =>
        {
            configuration.RootPath = "client/build";
        });
        */

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

        /* For future use when using a react app for ui
        app.UseSpa(spa =>
        {
            spa.Options.SourcePath = "client";

            if (app.Environment.IsDevelopment())
            {
                spa.UseReactDevelopmentServer(npmScript: "start");
            }
        });
        */

        app.Run();
    }
}