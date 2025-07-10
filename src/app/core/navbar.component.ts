import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent {
  constructor(public auth: AuthService, public router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
} 