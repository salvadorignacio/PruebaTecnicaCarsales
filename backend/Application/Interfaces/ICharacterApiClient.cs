using BackendApi.Domain.Entities;

namespace BackendApi.Application.Interfaces;

public interface ICharacterApiClient
{
    Task<(List<Character> Characters, int Count, int Pages, string? Next, string? Prev)> GetCharactersAsync(
        int page, string? name, string? status, string? species, string? gender);

    Task<Character> GetCharacterByIdAsync(int id);
}
