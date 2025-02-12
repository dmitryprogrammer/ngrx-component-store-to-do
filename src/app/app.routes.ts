import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies',
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./pages/movies/components/movies/movies.component').then((m) => m.MoviesComponent),
  },
];
