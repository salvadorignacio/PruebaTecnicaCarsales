# PruebaTecnicaCarsales

Aplicación fullstack que consume la [Rick and Morty API](https://rickandmortyapi.com/) y expone episodios y personajes con filtros y paginación.

## Arquitectura

```
Angular 18 (frontend)  →  ASP.NET Core 8 BFF (backend)  →  Rick and Morty REST API
```

El backend actúa como **BFF (Backend for Frontend)**: centraliza las llamadas a la API externa, aplica transformaciones de datos y expone endpoints optimizados para el frontend. Se siguieron principios de **Clean Architecture** y **SOLID**.

## Estructura del monorepo

```
PruebaTecnicaCarsales/
├── backend/     # BFF en ASP.NET Core 8
└── frontend/    # SPA en Angular 18
```

## Requisitos previos

| Herramienta | Versión mínima |
|---|---|
| .NET SDK | 8.0 |
| Node.js | 18.x |
| Angular CLI | 18.x (`npm i -g @angular/cli@18`) |

## Inicio rápido

### 1. Backend

```bash
cd backend
dotnet restore
dotnet run --launch-profile http
# Swagger disponible en http://localhost:5141/swagger
```

### 2. Frontend

```bash
cd frontend
npm install
ng serve
# App disponible en http://localhost:4200
```

## Funcionalidades

- **Episodios** — listado con filtro por nombre y temporada, paginación
- **Personajes** — listado con filtro por nombre, especie, estado y género, paginación
- Manejo global de errores (backend middleware + frontend error state)
- Carga diferida de rutas (`@defer`, `loadComponent`)
- Diseño responsivo sin frameworks CSS
