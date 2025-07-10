import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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