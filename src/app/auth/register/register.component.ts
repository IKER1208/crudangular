import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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