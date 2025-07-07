import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <h2>Iniciar sesión</h2>
      <form (ngSubmit)="login()" #f="ngForm">
        <input type="email" [(ngModel)]="email" name="email" placeholder="Correo" required autofocus />
        <input type="password" [(ngModel)]="password" name="password" placeholder="Contraseña" required />
        <button type="submit" [disabled]="loading">Entrar</button>
        <div class="error" *ngIf="error">{{error}}</div>
      </form>
      <a routerLink="/register">¿No tienes cuenta? Regístrate</a>
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
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    console.log('Intentando login con:', this.email, this.password); // 👈
    this.loading = true;
    this.error = '';
    try {
      await this.auth.login(this.email, this.password);
      console.log('Login exitoso, token en localStorage:', localStorage.getItem('token')); // 👈
      this.router.navigate(['/personas']);
    } catch (e: any) {
      this.error = e?.error?.message || 'Error de autenticación';
      console.log('Error en login:', e); // 👈
    }
    this.loading = false;
  }
} 