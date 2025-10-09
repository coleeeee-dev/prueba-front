import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  { path: 'login',
    loadComponent: () =>
      import('./auth/presentation/views/login/login').then(m => m.LoginComponent)
  },
  { path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/presentation/views/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  { path: 'shipments',
    loadComponent: () =>
      import('./shipments/presentation/views/shipments-list/shipments-list').then(m => m.ShipmentsListComponent)
  },
  { path: 'tracking',
    loadComponent: () =>
      import('./tracking/presentation/views/track/track').then(m => m.TrackComponent)
  },
  { path: 'pricing',
    loadComponent: () =>
      import('./pricing/presentation/views/quote/quote').then(m => m.QuoteComponent)
  },
  { path: 'notifications',
    loadComponent: () =>
      import('./notifications/presentation/views/notifications-list/notifications-list').then(m => m.NotificationsListComponent)
  },

  { path: 'shipments/news',
    loadComponent: () =>
      import('./shipments/presentation/views/shipment-form/shipment-form')
        .then(m => m.ShipmentFormComponent)
  },

  { path: '**',
    loadComponent: () =>
      import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFoundComponent)
  }
];
