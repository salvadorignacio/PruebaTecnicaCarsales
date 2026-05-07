using BackendApi.Application.DTOs;
using BackendApi.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class EpisodesController : ControllerBase
{
    private readonly IEpisodeService _episodeService;

    public EpisodesController(IEpisodeService episodeService)
    {
        _episodeService = episodeService;
    }

    /// <summary>Obtiene la lista paginada de episodios con filtros opcionales.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(PagedResultDto<EpisodeDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResultDto<EpisodeDto>>> GetEpisodes([FromQuery] EpisodeFilterDto filter)
    {
        var result = await _episodeService.GetEpisodesAsync(filter);
        return Ok(result);
    }

    /// <summary>Obtiene un episodio por su id.</summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(EpisodeDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<EpisodeDto>> GetEpisodeById(int id)
    {
        var episode = await _episodeService.GetEpisodeByIdAsync(id);
        return Ok(episode);
    }
}
