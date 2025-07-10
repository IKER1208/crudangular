import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3333';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  async login(email: string, password: string) {
    const res: any = await this.http.post(`${this.api}/login`, { email, password }).toPromise();
    const token = res.token || ''; 
    localStorage.setItem(this.tokenKey, token);
    console.log('Token guardado:', token);
  }

  async register(fullName: string, email: string, password: string) {
    await this.http.post(`${this.api}/register`, { fullName, email, password }).toPromise();
    console.log('Registro exitoso para:', email);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
} 