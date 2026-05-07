using BackendApi.Application.Interfaces;
using BackendApi.Application.Services;
using BackendApi.Infrastructure.ExternalApi;
using BackendApi.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new() { Title = "Rick and Morty API", Version = "v1" });
});

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var rickAndMortyBaseUrl = builder.Configuration["RickAndMortyApi:BaseUrl"]
    ?? throw new InvalidOperationException("RickAndMortyApi:BaseUrl is not configured.");

builder.Services.AddHttpClient<IEpisodeApiClient, RickAndMortyApiClient>(client =>
{
    client.BaseAddress = new Uri(rickAndMortyBaseUrl);
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});

builder.Services.AddHttpClient<ICharacterApiClient, RickAndMortyCharacterApiClient>(client =>
{
    client.BaseAddress = new Uri(rickAndMortyBaseUrl);
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});

builder.Services.AddScoped<IEpisodeService, EpisodeService>();
builder.Services.AddScoped<ICharacterService, CharacterService>();

var app = builder.Build();

app.UseMiddleware<GlobalExceptionMiddleware>();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Rick and Morty API v1");
    options.RoutePrefix = "swagger";
});

app.UseCors("AllowAngular");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
