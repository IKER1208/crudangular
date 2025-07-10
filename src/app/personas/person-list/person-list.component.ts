import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../../core/person.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
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