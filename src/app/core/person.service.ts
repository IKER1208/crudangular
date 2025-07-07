import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private api = 'http://localhost:3333/persons';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  getAll() {
    return this.http.get(this.api, { headers: this.getHeaders() });
  }

  getById(id: number) {
    return this.http.get(`${this.api}/${id}`, { headers: this.getHeaders() });
  }

  create(data: any) {
    return this.http.post(this.api, data, { headers: this.getHeaders() });
  }

  update(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`, { headers: this.getHeaders() });
  }
} 