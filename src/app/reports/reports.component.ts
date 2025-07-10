import { Component, OnInit } from '@angular/core';
import { ReportService } from '../core/report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  gender = { hombres: 0, mujeres: 0, hombresPerc: 50, mujeresPerc: 50 };
  age = { menores: 0, mayores: 0, menoresPerc: 50, mayoresPerc: 50 };
  genderAge = { hombresMenores: 0, hombresMayores: 0, mujeresMenores: 0, mujeresMayores: 0 };
  pieGradient = '';

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadReports();
  }

  async loadReports() {
    const g: any = await this.reportService.getGender().toPromise();
    const a: any = await this.reportService.getAge().toPromise();
    const ga: any = await this.reportService.getGenderAge().toPromise();
    const totalG = g.hombres + g.mujeres || 1;
    const totalA = a.menores + a.mayores || 1;
    this.gender = { ...g, hombresPerc: (g.hombres/totalG)*100, mujeresPerc: (g.mujeres/totalG)*100 };
    this.age = { ...a, menoresPerc: (a.menores/totalA)*100, mayoresPerc: (a.mayores/totalA)*100 };
    this.genderAge = ga;
    this.pieGradient = `conic-gradient(#1976d2 0% ${(ga.hombresMenores/this.totalGA(ga))*100}%, #43a047 ${(ga.hombresMenores/this.totalGA(ga))*100}% ${(ga.hombresMayores/this.totalGA(ga))*100 + (ga.hombresMenores/this.totalGA(ga))*100}%, #e91e63 ${(ga.hombresMayores/this.totalGA(ga))*100 + (ga.hombresMenores/this.totalGA(ga))*100}% ${(ga.mujeresMenores/this.totalGA(ga))*100 + (ga.hombresMayores/this.totalGA(ga))*100 + (ga.hombresMenores/this.totalGA(ga))*100}%, #ff9800 ${(ga.mujeresMenores/this.totalGA(ga))*100 + (ga.hombresMayores/this.totalGA(ga))*100 + (ga.hombresMenores/this.totalGA(ga))*100}% 100%)`;
  }

  totalGA(ga: any) {
    return ga.hombresMenores + ga.hombresMayores + ga.mujeresMenores + ga.mujeresMayores || 1;
  }
} 