import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'episodes',
    pathMatch: 'full'
  },
  {
    path: 'episodes',
    loadComponent: () =>
      import('./features/episodes/episode-list/episode-list.component').then(
        m => m.EpisodeListComponent
      )
  },
  {
    path: 'characters',
    loadComponent: () =>
      import('./features/characters/character-list/character-list.component').then(
        m => m.CharacterListComponent
      )
  },
  {
    path: '**',
    redirectTo: 'episodes'
  }
];
