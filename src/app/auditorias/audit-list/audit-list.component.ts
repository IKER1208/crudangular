import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditService } from '../../core/audit.service';

@Component({
  selector: 'app-audit-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.css']
})
export class AuditListComponent implements OnInit {
  logs: any[] = [];
  loading = false;
  error = '';

  constructor(private auditService: AuditService) {}

  ngOnInit() {
    this.loading = true;
    this.auditService.getAll().subscribe({
      next: (logs: any) => { this.logs = logs; this.loading = false; },
      error: (err) => { this.error = 'No se pudieron cargar las auditorías'; this.loading = false; }
    });
  }
} 