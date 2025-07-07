import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private api = 'http://localhost:3333/reports';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getGender() {
    return this.http.get(`${this.api}/gender`, { headers: this.getHeaders() });
  }

  getAge() {
    return this.http.get(`${this.api}/age`, { headers: this.getHeaders() });
  }

  getGenderAge() {
    return this.http.get(`${this.api}/gender-age`, { headers: this.getHeaders() });
  }
} 