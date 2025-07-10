import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'personas', loadComponent: () => import('./personas/person-list/person-list.component').then(m => m.PersonListComponent), canActivate: [authGuard] },
  { path: 'personas/nueva', loadComponent: () => import('./personas/person-form/person-form.component').then(m => m.PersonFormComponent), canActivate: [authGuard] },
  { path: 'personas/:id', loadComponent: () => import('./personas/persons-detail/person-detail.component').then(m => m.PersonDetailComponent), canActivate: [authGuard] },
  { path: 'personas/:id/editar', loadComponent: () => import('./personas/person-form/person-form.component').then(m => m.PersonFormComponent), canActivate: [authGuard] },
  { path: 'reportes', loadComponent: () => import('./reports/reports.component').then(m => m.ReportsComponent), canActivate: [authGuard] },
  { path: 'auditorias', loadComponent: () => import('./auditorias/audit-list/audit-list.component').then(m => m.AuditListComponent), canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
