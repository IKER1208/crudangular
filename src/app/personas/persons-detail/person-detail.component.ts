import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../core/person.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
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