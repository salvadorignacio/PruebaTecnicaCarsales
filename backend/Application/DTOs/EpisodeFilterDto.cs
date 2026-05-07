namespace BackendApi.Application.DTOs;

public class EpisodeFilterDto
{
    public string? Name { get; set; }
    public string? Episode { get; set; }
    public int Page { get; set; } = 1;
}
