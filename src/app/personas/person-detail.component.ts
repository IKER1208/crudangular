import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../core/person.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" *ngIf="person">
      <h2>Detalle de persona</h2>
      <div class="detail">
        <div><b>Nombre:</b> {{person.nombre}}</div>
        <div><b>Edad:</b> {{person.edad}}</div>
        <div><b>Sexo:</b> {{person.sexo === 'M' ? 'Hombre' : 'Mujer'}}</div>
      </div>
      <button (click)="volver()">Volver</button>
    </div>
    <div *ngIf="loading" class="loading">Cargando...</div>
    <div *ngIf="error" class="error">{{error}}</div>
  `,
  styles: [
    `.container { max-width: 400px; margin: 7vh auto; background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 24px #0001; padding: 2rem; }`,
    `h2 { font-weight: 600; margin-bottom: 1.5rem; }`,
    `.detail { margin-bottom: 2rem; }`,
    `.detail div { margin-bottom: 0.7rem; font-size: 1.1em; }`,
    `button { padding: 0.8rem; border: none; border-radius: 0.7rem; background: #222; color: #fff; font-weight: 600; font-size: 1rem; cursor: pointer; transition: background 0.2s; }`,
    `.loading, .error { text-align: center; color: #888; margin-top: 2rem; }`,
    `.error { color: #d32f2f; }`
  ]
})
export class PersonDetailComponent implements OnInit {
  person: any = null;
  loading = false;
  error = '';

  constructor(private personService: PersonService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.personService.getById(Number(id)).subscribe({
        next: (p: any) => { this.person = p; this.loading = false; },
        error: () => { this.error = 'No se pudo cargar la persona'; this.loading = false; }
      });
    }
  }

  volver() {
    this.router.navigate(['/personas']);
  }
} 