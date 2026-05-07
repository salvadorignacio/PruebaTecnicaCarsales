namespace BackendApi.Application.DTOs;

public class CharacterFilterDto
{
    public int Page { get; set; } = 1;
    public string? Name { get; set; }
    public string? Status { get; set; }
    public string? Species { get; set; }
    public string? Gender { get; set; }
}
