namespace BackendApi.Domain.Entities;

public class Episode
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string AirDate { get; set; } = string.Empty;
    public string EpisodeCode { get; set; } = string.Empty;
    public List<string> Characters { get; set; } = [];
    public string Url { get; set; } = string.Empty;
    public string Created { get; set; } = string.Empty;
}
