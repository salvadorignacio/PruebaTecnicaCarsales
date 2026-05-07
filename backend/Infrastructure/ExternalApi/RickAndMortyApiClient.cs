using System.Net.Http.Json;
using BackendApi.Application.Interfaces;
using BackendApi.Domain.Entities;
using BackendApi.Infrastructure.ExternalApi.Models;

namespace BackendApi.Infrastructure.ExternalApi;

public class RickAndMortyApiClient : IEpisodeApiClient
{
    private readonly HttpClient _httpClient;

    public RickAndMortyApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<(List<Episode> Episodes, int Count, int Pages, string? Next, string? Prev)> GetEpisodesAsync(
        int page, string? name, string? episodeCode)
    {
        var url = BuildUrl("episode", page, name, episodeCode);
        var response = await _httpClient.GetFromJsonAsync<RickAndMortyPagedResponse<RickAndMortyEpisode>>(url);

        if (response is null)
            return ([], 0, 0, null, null);

        var episodes = response.Results.Select(MapToDomain).ToList();
        return (episodes, response.Info.Count, response.Info.Pages, response.Info.Next, response.Info.Prev);
    }

    public async Task<Episode> GetEpisodeByIdAsync(int id)
    {
        var response = await _httpClient.GetFromJsonAsync<RickAndMortyEpisode>($"episode/{id}");

        if (response is null)
            throw new KeyNotFoundException($"Episode with id {id} was not found.");

        return MapToDomain(response);
    }

    private static Episode MapToDomain(RickAndMortyEpisode source) => new()
    {
        Id = source.Id,
        Name = source.Name,
        AirDate = source.AirDate,
        EpisodeCode = source.EpisodeCode,
        Characters = source.Characters,
        Url = source.Url,
        Created = source.Created
    };

    private static string BuildUrl(string resource, int page, string? name, string? episodeCode)
    {
        var queryParams = new List<string> { $"page={page}" };

        if (!string.IsNullOrWhiteSpace(name))
            queryParams.Add($"name={Uri.EscapeDataString(name)}");

        if (!string.IsNullOrWhiteSpace(episodeCode))
            queryParams.Add($"episode={Uri.EscapeDataString(episodeCode)}");

        return $"{resource}?{string.Join("&", queryParams)}";
    }
}
