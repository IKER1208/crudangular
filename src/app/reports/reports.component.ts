import { Component, OnInit } from '@angular/core';
import { ReportService } from '../core/report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Reportes</h2>
      <div class="report-section">
        <h3>1. Hombres vs Mujeres</h3>
        <div class="bar-graph">
          <div class="bar" [style.width.%]="gender.hombresPerc" style="background:#1976d2">Hombres: {{gender.hombres}}</div>
          <div class="bar" [style.width.%]="gender.mujeresPerc" style="background:#e91e63">Mujeres: {{gender.mujeres}}</div>
        </div>
      </div>
      <div class="report-section">
        <h3>2. Menores vs Mayores</h3>
        <div class="bar-graph">
          <div class="bar" [style.width.%]="age.menoresPerc" style="background:#43a047">Menores: {{age.menores}}</div>
          <div class="bar" [style.width.%]="age.mayoresPerc" style="background:#ff9800">Mayores: {{age.mayores}}</div>
        </div>
      </div>
      <div class="report-section">
        <h3>3. Hombres/Mujeres Menores/Mayores</h3>
        <div class="pie-graph">
          <div class="pie" [style.background]="pieGradient"></div>
          <div class="legend">
            <div><span class="dot" style="background:#1976d2"></span> Hombres Menores: {{genderAge.hombresMenores}}</div>
            <div><span class="dot" style="background:#43a047"></span> Hombres Mayores: {{genderAge.hombresMayores}}</div>
            <div><span class="dot" style="background:#e91e63"></span> Mujeres Menores: {{genderAge.mujeresMenores}}</div>
            <div><span class="dot" style="background:#ff9800"></span> Mujeres Mayores: {{genderAge.mujeresMayores}}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.container { max-width: 700px; margin: 5vh auto; background: #fff; border-radius: 1.2rem; box-shadow: 0 2px 24px #0001; padding: 2rem; }`,
    `h2 { font-weight: 600; margin-bottom: 2rem; }`,
    `.report-section { margin-bottom: 2.5rem; }`,
    `.bar-graph { display: flex; gap: 1rem; margin-top: 1rem; }`,
    `.bar { color: #fff; padding: 0.7rem 1rem; border-radius: 0.7rem; font-weight: 600; font-size: 1rem; transition: width 0.4s; white-space: nowrap; }`,
    `.pie-graph { display: flex; align-items: center; gap: 2rem; margin-top: 1rem; }`,
    `.pie { width: 120px; height: 120px; border-radius: 50%; background: conic-gradient(#1976d2 0% 25%, #43a047 25% 50%, #e91e63 50% 75%, #ff9800 75% 100%); box-shadow: 0 2px 12px #0002; }`,
    `.legend { display: flex; flex-direction: column; gap: 0.5rem; }`,
    `.dot { display: inline-block; width: 1.1em; height: 1.1em; border-radius: 50%; margin-right: 0.5em; }`
  ]
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