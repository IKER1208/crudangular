import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../core/person.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
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