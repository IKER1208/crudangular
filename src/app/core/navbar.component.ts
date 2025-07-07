import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav *ngIf="auth.isLoggedIn()">
      <a routerLink="/personas" routerLinkActive="active">Personas</a>
      <a routerLink="/reportes" routerLinkActive="active">Reportes</a>
      <button (click)="logout()">Salir</button>
    </nav>
  `,
  styles: [
    `nav { display: flex; gap: 1.5rem; align-items: center; justify-content: center; background: #fff; box-shadow: 0 2px 12px #0001; padding: 1.2rem 0; border-radius: 0 0 1.2rem 1.2rem; margin-bottom: 2rem; }`,
    `a { color: #222; text-decoration: none; font-weight: 500; font-size: 1.1em; padding: 0.3em 0.7em; border-radius: 0.5em; transition: background 0.2s; }`,
    `a.active, a:hover { background: #f5f5f5; }`,
    `button { background: #d32f2f; color: #fff; border: none; border-radius: 0.7rem; padding: 0.5rem 1.2rem; font-size: 1em; cursor: pointer; font-weight: 500; }`
  ]
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
} 