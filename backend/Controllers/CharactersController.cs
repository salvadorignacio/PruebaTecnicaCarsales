using BackendApi.Application.DTOs;
using BackendApi.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class CharactersController : ControllerBase
{
    private readonly ICharacterService _characterService;

    public CharactersController(ICharacterService characterService)
    {
        _characterService = characterService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(PagedResultDto<CharacterDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<PagedResultDto<CharacterDto>>> GetCharacters([FromQuery] CharacterFilterDto filter)
    {
        var result = await _characterService.GetCharactersAsync(filter);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(CharacterDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CharacterDto>> GetCharacterById(int id)
    {
        var character = await _characterService.GetCharacterByIdAsync(id);
        return Ok(character);
    }
}
