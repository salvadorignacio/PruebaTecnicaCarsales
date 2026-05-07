using System.Net.Http.Json;
using BackendApi.Application.Interfaces;
using BackendApi.Domain.Entities;
using BackendApi.Infrastructure.ExternalApi.Models;

namespace BackendApi.Infrastructure.ExternalApi;

public class RickAndMortyCharacterApiClient : ICharacterApiClient
{
    private readonly HttpClient _httpClient;

    public RickAndMortyCharacterApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<(List<Character> Characters, int Count, int Pages, string? Next, string? Prev)> GetCharactersAsync(
        int page, string? name, string? status, string? species, string? gender)
    {
        var url = BuildUrl(page, name, status, species, gender);
        var response = await _httpClient.GetFromJsonAsync<RickAndMortyPagedResponse<RickAndMortyCharacter>>(url);

        if (response is null)
            return ([], 0, 0, null, null);

        var characters = response.Results.Select(MapToDomain).ToList();
        return (characters, response.Info.Count, response.Info.Pages, response.Info.Next, response.Info.Prev);
    }

    public async Task<Character> GetCharacterByIdAsync(int id)
    {
        var response = await _httpClient.GetFromJsonAsync<RickAndMortyCharacter>($"character/{id}");

        if (response is null)
            throw new KeyNotFoundException($"Character with id {id} was not found.");

        return MapToDomain(response);
    }

    private static Character MapToDomain(RickAndMortyCharacter source) => new()
    {
        Id = source.Id,
        Name = source.Name,
        Status = source.Status,
        Species = source.Species,
        Gender = source.Gender,
        OriginName = source.Origin.Name,
        LocationName = source.Location.Name,
        Image = source.Image,
        EpisodeCount = source.Episode.Count
    };

    private static string BuildUrl(int page, string? name, string? status, string? species, string? gender)
    {
        var queryParams = new List<string> { $"page={page}" };

        if (!string.IsNullOrWhiteSpace(name)) queryParams.Add($"name={Uri.EscapeDataString(name)}");
        if (!string.IsNullOrWhiteSpace(status)) queryParams.Add($"status={Uri.EscapeDataString(status)}");
        if (!string.IsNullOrWhiteSpace(species)) queryParams.Add($"species={Uri.EscapeDataString(species)}");
        if (!string.IsNullOrWhiteSpace(gender)) queryParams.Add($"gender={Uri.EscapeDataString(gender)}");

        return $"character?{string.Join("&", queryParams)}";
    }
}
