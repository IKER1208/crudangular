import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuditService {
  private api = 'http://localhost:3333/auditorias';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getAll() {
    return this.http.get(this.api, { headers: this.getHeaders() });
  }
} 