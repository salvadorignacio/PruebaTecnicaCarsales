using BackendApi.Application.DTOs;

namespace BackendApi.Application.Interfaces;

public interface IEpisodeService
{
    Task<PagedResultDto<EpisodeDto>> GetEpisodesAsync(EpisodeFilterDto filter);
    Task<EpisodeDto> GetEpisodeByIdAsync(int id);
}
