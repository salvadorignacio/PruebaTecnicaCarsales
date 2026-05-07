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
    path: '**',
    redirectTo: 'episodes'
  }
];
