import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'residents',
        loadChildren: () =>
          import('./residents/residents.routes').then(m => m.default)
      },
      {
        path: 'finance',
        loadChildren: () =>
          import('./finance/finance.routes').then(m => m.default)
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('./staff/staff.routes').then(m => m.default)
      },
      {
        path: 'visitor-auth',
        loadChildren: () =>
          import('./visitor-auth/visitor-auth.routes').then(m => m.default)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
