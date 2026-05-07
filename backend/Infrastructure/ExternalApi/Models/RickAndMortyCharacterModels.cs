using System.Text.Json.Serialization;

namespace BackendApi.Infrastructure.ExternalApi.Models;

internal class RickAndMortyCharacter
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("status")]
    public string Status { get; set; } = string.Empty;

    [JsonPropertyName("species")]
    public string Species { get; set; } = string.Empty;

    [JsonPropertyName("gender")]
    public string Gender { get; set; } = string.Empty;

    [JsonPropertyName("origin")]
    public RickAndMortyLocation Origin { get; set; } = new();

    [JsonPropertyName("location")]
    public RickAndMortyLocation Location { get; set; } = new();

    [JsonPropertyName("image")]
    public string Image { get; set; } = string.Empty;

    [JsonPropertyName("episode")]
    public List<string> Episode { get; set; } = [];
}

internal class RickAndMortyLocation
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;
}
