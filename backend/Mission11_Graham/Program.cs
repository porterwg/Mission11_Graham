using Microsoft.EntityFrameworkCore;
using Mission11_Graham.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Adding DbContext & ability to use sqlite. Pointing to connection string
builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

//Making cors available. Wasn't working for a while. Prof. Hilton and I worked on it and chat had us
//add the .AddPolicy and whatnot and then it worked so I'm keeping it :)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // React frontend will always be on port 3000
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//More cors stuff, but we just need to point to the AddCors above
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
