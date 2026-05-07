# Backend — ASP.NET Core 8 BFF

Backend for Frontend que actúa de intermediario entre el frontend Angular y la Rick and Morty API externa.

## Requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8)

## Ejecución

```bash
cd backend
dotnet restore
dotnet run --launch-profile http
```

Swagger UI disponible en: **http://localhost:5141/swagger**

## Arquitectura — Clean Architecture

```
Domain/
  Entities/          # Entidades de dominio (Episode, Character)
Application/
  DTOs/              # Contratos de entrada/salida (EpisodeDto, CharacterDto, PagedResultDto)
  Interfaces/        # Contratos de servicios y clientes API
  Services/          # Casos de uso (EpisodeService, CharacterService)
Infrastructure/
  ExternalApi/       # Implementaciones que consumen Rick and Morty API
Controllers/         # Endpoints HTTP (sin lógica de negocio)
Middleware/          # GlobalExceptionMiddleware
```

## Endpoints disponibles

### Episodios

| Método | Ruta | Query params |
|---|---|---|
| GET | `/api/episodes` | `page`, `name`, `episode` |
| GET | `/api/episodes/{id}` | — |

### Personajes

| Método | Ruta | Query params |
|---|---|---|
| GET | `/api/characters` | `page`, `name`, `status`, `species`, `gender` |
| GET | `/api/characters/{id}` | — |

**Valores válidos para `status`:** `Alive`, `Dead`, `unknown`  
**Valores válidos para `gender`:** `Female`, `Male`, `Genderless`, `unknown`  
**Formato de `episode`:** código de episodio (e.g. `S01E01`) o prefijo de temporada (e.g. `S01`)

## Configuración

Toda la configuración externa está en `appsettings.json`:

```json
{
  "RickAndMortyApi": {
    "BaseUrl": "https://rickandmortyapi.com/api/"
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:4200"]
  }
}
```

Para sobrescribir en desarrollo sin modificar `appsettings.json`, usar `appsettings.Development.json` o variables de entorno.

## Manejo de errores

El middleware `GlobalExceptionMiddleware` intercepta todas las excepciones no controladas:

| Excepción | Código HTTP |
|---|---|
| `KeyNotFoundException` | 404 Not Found |
| `HttpRequestException` | 502 Bad Gateway |
| Cualquier otra | 500 Internal Server Error |
