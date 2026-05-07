namespace BackendApi.Application.DTOs;

public class PagedResultDto<T>
{
    public int Count { get; set; }
    public int Pages { get; set; }
    public string? Next { get; set; }
    public string? Prev { get; set; }
    public List<T> Results { get; set; } = [];
}
