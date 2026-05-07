using BackendApi.Domain.Entities;

namespace BackendApi.Application.Interfaces;

public interface IEpisodeApiClient
{
    Task<(List<Episode> Episodes, int Count, int Pages, string? Next, string? Prev)> GetEpisodesAsync(
        int page, string? name, string? episodeCode);

    Task<Episode> GetEpisodeByIdAsync(int id);
}
