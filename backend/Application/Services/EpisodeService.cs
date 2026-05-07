using BackendApi.Application.DTOs;
using BackendApi.Application.Interfaces;
using BackendApi.Domain.Entities;

namespace BackendApi.Application.Services;

public class EpisodeService : IEpisodeService
{
    private readonly IEpisodeApiClient _apiClient;

    public EpisodeService(IEpisodeApiClient apiClient)
    {
        _apiClient = apiClient;
    }

    public async Task<PagedResultDto<EpisodeDto>> GetEpisodesAsync(EpisodeFilterDto filter)
    {
        var (episodes, count, pages, next, prev) =
            await _apiClient.GetEpisodesAsync(filter.Page, filter.Name, filter.Episode);

        return new PagedResultDto<EpisodeDto>
        {
            Count = count,
            Pages = pages,
            Next = next,
            Prev = prev,
            Results = episodes.Select(MapToDto).ToList()
        };
    }

    public async Task<EpisodeDto> GetEpisodeByIdAsync(int id)
    {
        var episode = await _apiClient.GetEpisodeByIdAsync(id);
        return MapToDto(episode);
    }

    private static EpisodeDto MapToDto(Episode episode) => new()
    {
        Id = episode.Id,
        Name = episode.Name,
        AirDate = episode.AirDate,
        EpisodeCode = episode.EpisodeCode,
        Characters = episode.Characters
    };
}
