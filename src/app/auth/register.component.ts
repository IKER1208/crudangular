import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <h2>Registro</h2>
      <form (ngSubmit)="register()" #f="ngForm">
        <input type="text" [(ngModel)]="fullName" name="fullName" placeholder="Nombre completo" required />
        <input type="email" [(ngModel)]="email" name="email" placeholder="Correo" required />
        <input type="password" [(ngModel)]="password" name="password" placeholder="Contraseña" required />
        <button type="submit" [disabled]="loading">Registrarse</button>
        <div class="error" *ngIf="error">{{error}}</div>
      </form>
      <a routerLink="/login">¿Ya tienes cuenta? Inicia sesión</a>
    </div>
  `,
  styles: [
    `.auth-container { max-width: 340px; margin: 8vh auto; padding: 2rem; border-radius: 1.2rem; background: #fff; box-shadow: 0 2px 24px #0001; display: flex; flex-direction: column; align-items: center; }`,
    `h2 { margin-bottom: 1.5rem; font-weight: 600; }`,
    `form { width: 100%; display: flex; flex-direction: column; gap: 1rem; }`,
    `input { padding: 0.8rem 1rem; border: 1px solid #e0e0e0; border-radius: 0.7rem; font-size: 1rem; }`,
    `button { padding: 0.8rem; border: none; border-radius: 0.7rem; background: #222; color: #fff; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s; }`,
    `button:disabled { background: #888; }`,
    `.error { color: #d32f2f; margin-top: 0.5rem; font-size: 0.95em; }`,
    `a { margin-top: 1.5rem; color: #222; text-decoration: underline; font-size: 0.97em; }`
  ]
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async register() {
    this.loading = true;
    this.error = '';
    try {
      await this.auth.register(this.fullName, this.email, this.password);
      this.router.navigate(['/login']);
    } catch (e: any) {
      this.error = e?.error?.message || 'Error de registro';
    }
    this.loading = false;
  }
} 