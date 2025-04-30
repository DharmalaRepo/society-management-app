import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterSocietyComponent } from './register-society/register-society.component';

export const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  {
      path: 'welcome',
      loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent)
    },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  { path: 'register-society', component: RegisterSocietyComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'residents', loadChildren: () => import('./residents/residents.routes').then(m => m.default) },
      { path: 'finance', loadChildren: () => import('./finance/finance.routes').then(m => m.default) },
      { path: 'staff', loadChildren: () => import('./staff/staff.routes').then(m => m.default) },
      { path: 'visitor-auth', loadChildren: () => import('./visitor-auth/visitor-auth.routes').then(m => m.default) },
      { path: 'society-management', loadChildren: () => import('./society-management/society-management.routes').then(m => m.default) },
      { path: 'grievances', loadChildren: () => import('./grievances/grievances.routes').then(m => m.default) },
      { path: 'events', loadChildren: () => import('./events/events-festive.routes').then(m => m.default) },
      { path: '**', redirectTo: 'society-management' }, // fallback if user hits wrong URL inside layout
    ]
  },

  { path: '**', redirectTo: 'login' } // fallback for any wrong URL
];
