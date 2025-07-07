import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../core/person.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Personas</h2>
        <button (click)="goToNew()">+ Nueva persona</button>
      </div>
      <div *ngIf="loading" class="loading">Cargando...</div>
      <div *ngIf="error" class="error">{{error}}</div>
      <table *ngIf="!loading && personas.length">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of personas">
            <td>{{p.nombre}}</td>
            <td>{{p.edad}}</td>
            <td>{{p.sexo}}</td>
            <td>
              <button (click)="goToDetail(p.id)">Ver</button>
              <button (click)="goToEdit(p.id)">Editar</button>
              <button (click)="delete(p.id)">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="!loading && !personas.length" class="empty">No hay personas registradas.</div>
    </div>
  `,
  styles: [
    `.container { max-width: 700px; margin: 5vh auto; background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 24px #0001; padding: 2rem; }`,
    `.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }`,
    `h2 { font-weight: 600; }`,
    `button { background: #222; color: #fff; border: none; border-radius: 0.7rem; padding: 0.5rem 1.2rem; font-size: 1rem; cursor: pointer; margin-right: 0.5rem; }`,
    `button:last-child { margin-right: 0; background: #d32f2f; }`,
    `table { width: 100%; border-collapse: collapse; margin-top: 1rem; }`,
    `th, td { padding: 0.7rem 0.5rem; text-align: left; }`,
    `th { background: #f5f5f5; }`,
    `tr:nth-child(even) { background: #fafafa; }`,
    `.loading, .error, .empty { text-align: center; margin-top: 2rem; color: #888; }`,
    `.error { color: #d32f2f; }`
  ]
})
export class PersonListComponent implements OnInit {
  personas: any[] = [];
  loading = false;
  error = '';

  constructor(private personService: PersonService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  async load() {
    this.loading = true;
    this.error = '';
    try {
      this.personas = await this.personService.getAll().toPromise() as any[];
    } catch (e: any) {
      this.error = e?.error?.message || 'Error al cargar personas';
    }
    this.loading = false;
  }

  goToNew() {
    this.router.navigate(['/personas/nueva']);
  }
  goToEdit(id: number) {
    this.router.navigate([`/personas/${id}/editar`]);
  }
  goToDetail(id: number) {
    this.router.navigate([`/personas/${id}`]);
  }
  async delete(id: number) {
    if (confirm('¿Seguro que deseas borrar esta persona?')) {
      await this.personService.delete(id).toPromise();
      this.load();
    }
  }
} 