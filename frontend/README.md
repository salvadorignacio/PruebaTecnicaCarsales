# Frontend — Angular 18

SPA en Angular 18 que consume el BFF y muestra episodios y personajes de Rick and Morty con filtros y paginación.

## Requisitos

- [Node.js 18+](https://nodejs.org/)
- Angular CLI 18: `npm install -g @angular/cli@18`
- Backend BFF corriendo en `http://localhost:5141` (ver `backend/README.md`)

## Ejecución

```bash
cd frontend
npm install
ng serve
```

Aplicación disponible en: **http://localhost:4200**

## Rutas

| Ruta | Descripción |
|---|---|
| `/episodes` | Listado de episodios con filtros |
| `/characters` | Listado de personajes con filtros |

La ruta raíz `/` redirige automáticamente a `/episodes`.

## Estructura

```
src/
  app/
    core/
      models/          # Interfaces TypeScript (Episode, Character, PagedResult, filtros)
    features/
      episodes/        # Componentes de episodios (list, card, filter)
      characters/      # Componentes de personajes (list, card, filter)
    shared/
      components/      # Componentes reutilizables (pagination, loading-spinner, error-message)
    services/          # EpisodeService, CharacterService (HttpClient)
    app.routes.ts      # Rutas con lazy loading (loadComponent)
    app.config.ts      # provideHttpClient, provideRouter
  environments/
    environment.ts             # Producción
    environment.development.ts # Desarrollo (apiUrl apunta al BFF local)
```

## Tecnologías destacadas

- **Signals** (`signal`, `computed`, `toSignal`, `toObservable`) para estado reactivo sin BehaviorSubject
- **`@defer`** para carga diferida de grillas
- **`switchMap`** para cancelar requests anteriores al cambiar filtros
- Debounce de 400 ms en inputs de texto para reducir llamadas a la API
- Componentes **standalone** sin NgModules
- Diseño responsivo con SCSS puro (sin frameworks CSS)

## Configuración

La URL del backend se configura en `src/environments/`:

```typescript
// environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5141/api'
};
```

Para apuntar a otro entorno, modificar `apiUrl` en el archivo de entorno correspondiente.
