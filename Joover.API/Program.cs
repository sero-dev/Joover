using Coravel;
using Joover.API.Hubs;
using Joover.API.Tasks;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddScheduler();

builder.Services.AddTransient<ProcessorUsageTask>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(opt => opt.AddDefaultPolicy(policy => {
    policy.AllowAnyOrigin();
    policy.AllowAnyMethod();
}));

var app = builder.Build();

app.Services.UseScheduler(scheduler => {
    scheduler.Schedule<ProcessorUsageTask>()
        .EverySecond();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.MapHub<PartHub>("/hub/part");

app.Run();
