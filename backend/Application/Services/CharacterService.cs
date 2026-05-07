using BackendApi.Application.DTOs;
using BackendApi.Application.Interfaces;
using BackendApi.Domain.Entities;

namespace BackendApi.Application.Services;

public class CharacterService : ICharacterService
{
    private readonly ICharacterApiClient _apiClient;

    public CharacterService(ICharacterApiClient apiClient)
    {
        _apiClient = apiClient;
    }

    public async Task<PagedResultDto<CharacterDto>> GetCharactersAsync(CharacterFilterDto filter)
    {
        var (characters, count, pages, next, prev) =
            await _apiClient.GetCharactersAsync(filter.Page, filter.Name, filter.Status, filter.Species, filter.Gender);

        return new PagedResultDto<CharacterDto>
        {
            Count = count,
            Pages = pages,
            Next = next,
            Prev = prev,
            Results = characters.Select(MapToDto).ToList()
        };
    }

    public async Task<CharacterDto> GetCharacterByIdAsync(int id)
    {
        var character = await _apiClient.GetCharacterByIdAsync(id);
        return MapToDto(character);
    }

    private static CharacterDto MapToDto(Character character) => new()
    {
        Id = character.Id,
        Name = character.Name,
        Status = character.Status,
        Species = character.Species,
        Gender = character.Gender,
        OriginName = character.OriginName,
        LocationName = character.LocationName,
        Image = character.Image,
        EpisodeCount = character.EpisodeCount
    };
}
