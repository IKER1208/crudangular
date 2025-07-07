import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../core/person.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>{{isEdit ? 'Editar' : 'Nueva'}} persona</h2>
      <form (ngSubmit)="save()" *ngIf="loaded">
        <input type="text" [(ngModel)]="person.nombre" name="nombre" placeholder="Nombre" required />
        <input type="number" [(ngModel)]="person.edad" name="edad" placeholder="Edad" required min="0" />
        <select [(ngModel)]="person.sexo" name="sexo" required>
          <option value="" disabled>Sexo</option>
          <option value="M">Hombre</option>
          <option value="F">Mujer</option>
        </select>
        <button type="submit" [disabled]="loading">Guardar</button>
        <div class="error" *ngIf="error">{{error}}</div>
      </form>
      <div *ngIf="!loaded" class="loading">Cargando...</div>
    </div>
  `,
  styles: [
    `.container { max-width: 400px; margin: 7vh auto; background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 24px #0001; padding: 2rem; }`,
    `h2 { font-weight: 600; margin-bottom: 1.5rem; }`,
    `form { display: flex; flex-direction: column; gap: 1rem; }`,
    `input, select { padding: 0.8rem 1rem; border: 1px solid #e0e0e0; border-radius: 0.7rem; font-size: 1rem; }`,
    `button { padding: 0.8rem; border: none; border-radius: 0.7rem; background: #222; color: #fff; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s; }`,
    `button:disabled { background: #888; }`,
    `.error { color: #d32f2f; margin-top: 0.5rem; font-size: 0.95em; }`,
    `.loading { text-align: center; color: #888; }`
  ]
})
export class PersonFormComponent implements OnInit {
  person: any = { nombre: '', edad: '', sexo: '' };
  isEdit = false;
  loading = false;
  loaded = false;
  error = '';

  constructor(private personService: PersonService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!id;
    if (this.isEdit) {
      this.personService.getById(Number(id)).subscribe({
        next: (p: any) => { this.person = p; this.loaded = true; },
        error: () => { this.error = 'No se pudo cargar la persona'; this.loaded = true; }
      });
    } else {
      this.loaded = true;
    }
  }

  async save() {
    this.loading = true;
    this.error = '';
    try {
      if (this.isEdit) {
        await this.personService.update(this.person.id, this.person).toPromise();
      } else {
        await this.personService.create(this.person).toPromise();
      }
      this.router.navigate(['/personas']);
    } catch (e: any) {
      this.error = e?.error?.message || 'Error al guardar';
    }
    this.loading = false;
  }
} 