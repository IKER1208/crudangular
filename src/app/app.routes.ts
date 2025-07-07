import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register.component').then(m => m.RegisterComponent) },
  { path: 'personas', loadComponent: () => import('./personas/person-list.component').then(m => m.PersonListComponent) },
  { path: 'personas/nueva', loadComponent: () => import('./personas/person-form.component').then(m => m.PersonFormComponent) },
  { path: 'personas/:id', loadComponent: () => import('./personas/person-detail.component').then(m => m.PersonDetailComponent) },
  { path: 'personas/:id/editar', loadComponent: () => import('./personas/person-form.component').then(m => m.PersonFormComponent) },
  { path: 'reportes', loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
