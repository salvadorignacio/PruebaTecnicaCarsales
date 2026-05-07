using System.Text.Json.Serialization;

namespace BackendApi.Infrastructure.ExternalApi.Models;

internal class RickAndMortyPagedResponse<T>
{
    [JsonPropertyName("info")]
    public RickAndMortyInfo Info { get; set; } = new();

    [JsonPropertyName("results")]
    public List<T> Results { get; set; } = [];
}

internal class RickAndMortyInfo
{
    [JsonPropertyName("count")]
    public int Count { get; set; }

    [JsonPropertyName("pages")]
    public int Pages { get; set; }

    [JsonPropertyName("next")]
    public string? Next { get; set; }

    [JsonPropertyName("prev")]
    public string? Prev { get; set; }
}

internal class RickAndMortyEpisode
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("air_date")]
    public string AirDate { get; set; } = string.Empty;

    [JsonPropertyName("episode")]
    public string EpisodeCode { get; set; } = string.Empty;

    [JsonPropertyName("characters")]
    public List<string> Characters { get; set; } = [];

    [JsonPropertyName("url")]
    public string Url { get; set; } = string.Empty;

    [JsonPropertyName("created")]
    public string Created { get; set; } = string.Empty;
}
