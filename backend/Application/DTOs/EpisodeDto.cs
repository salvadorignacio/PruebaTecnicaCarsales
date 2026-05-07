namespace BackendApi.Application.DTOs;

public class EpisodeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string AirDate { get; set; } = string.Empty;
    public string EpisodeCode { get; set; } = string.Empty;
    public List<string> Characters { get; set; } = [];
}
