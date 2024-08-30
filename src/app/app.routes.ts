import { Routes } from '@angular/router';
import { APPLICATION_ROUTES } from './constants/routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },

  {
    path: APPLICATION_ROUTES.ADVENTURE,
    loadComponent: () =>
      import('./pages/travel-game/travel-game.component').then(
        (m) => m.TravelGameComponent,
      ),
  },
  // Redirect all other routes to the home page this can be a 404 page as well
  {
    path: '**',
    redirectTo: '',
  },
];
