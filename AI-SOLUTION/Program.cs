using DOMAIN.SeedData;
using INFRASTRUCTURE;
using INFRASTRUCTURE.IRepository;
using INFRASTRUCTURE.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SERVICES.AccountService;
using System.Text;
using UserManagementSystemAPI.Profiles;
using UserProfileData.Context;
using UserProfileData.Domain;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IChatGPTService, ChatGPTService>();
builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddScoped<ITopicRepository, TopicRepository>();
builder.Services.AddScoped<ITopicService, TopicService>();
//builder.Services.AddDbContext<AIContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("AI-Assistant")));
builder.Services.AddDbContext<AIContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SQLiteConnection")));


builder.Services.AddIdentity<UserProfile, IdentityRole>()
       .AddEntityFrameworkStores<AIContext>()
       .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = "JWT:ValidAudience",
        ValidIssuer = "JWT:ValidIssuer",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("JWT:Secret"))
    };
});
// Other service configurations

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowOrigin", builder =>
    {
        builder
            .AllowAnyOrigin() // You can also specify specific origins
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});



builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfiles));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
using(var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AIContext>();

    // Seed the data
    SeedData.SeedDataonDb(dbContext);
}
// Configure the HTTP request pipeline.
if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
