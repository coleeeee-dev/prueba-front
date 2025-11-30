import { Routes } from '@angular/router';
import { authGuard } from './auth/infrastructure/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/presentation/views/login/login').then(
        (m) => m.LoginComponent
      )
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/presentation/views/dashboard/dashboard').then(
        (m) => m.DashboardComponent
      )
  },
  {
    path: 'tracking',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./tracking/presentation/views/track/track').then(
        (m) => m.TrackComponent
      )
  },
  {
    path: 'shipments',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './shipments/presentation/views/shipments-list/shipments-list'
        ).then((m) => m.ShipmentsListComponent)
  },
  {
    path: 'shipments/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import(
        './shipments/presentation/views/shipment-form/shipment-form'
        ).then((m) => m.ShipmentFormComponent)
  },

  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/presentation/views/signup/signup')
        .then(m => m.SignupComponent)
  },



  {
    path: 'register',
    loadComponent: () =>
      import('./auth/presentation/views/signup/signup').then(
        (m) => m.SignupComponent
      )
  },

  { path: 'pricing',
    loadComponent: () =>
      import('./pricing/presentation/views/quote/quote').then(m => m.QuoteComponent)
  },

  { path: 'notifications',
    loadComponent: () =>
      import('./notifications/presentation/views/notifications-list/notifications').then(m => m.NotificationsComponent)
  },

  {
    path: 'auction',
    loadChildren: () =>
      import('./auction/presentation/auction.routes').then(
        (m) => m.AUCTION_ROUTES
      )
  },


  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signup'
  },
  {
    path: '**',
    redirectTo: 'signup'
  }
];
