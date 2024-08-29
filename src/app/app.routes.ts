import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  // Redirect all other routes to the home page this can be a 404 page as well
  {
    path: '**',
    redirectTo: '',
  },
];
