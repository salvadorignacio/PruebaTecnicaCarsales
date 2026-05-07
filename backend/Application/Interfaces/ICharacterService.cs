using BackendApi.Application.DTOs;

namespace BackendApi.Application.Interfaces;

public interface ICharacterService
{
    Task<PagedResultDto<CharacterDto>> GetCharactersAsync(CharacterFilterDto filter);
    Task<CharacterDto> GetCharacterByIdAsync(int id);
}
