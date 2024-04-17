import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Chart, LinearScale, TimeScale, ChartConfiguration } from 'chart.js';
import { registerables } from 'chart.js';
import { MasterService } from '../../services/master.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  pieContainer: any;
  lineContainer: any;
  pieConfig: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];
  pie: any;
  line: Chart | undefined;
  constructor(private _master: MasterService) {}
  ngOnInit() {
    this.generatePie();
  }
  generatePie() {
    this.chartData = this._master.getGenreCount();
    this.chartDatalabels = this._master.getGenresArray();
    this.pieContainer = document.getElementById('myChart');
    this.pieConfig = {
      type: 'pie',
      options: {},
      data: {
        labels: this.chartDatalabels,
        datasets: [
          {
            label: 'Chart Data',
            data: this.chartData,
            borderWidth: 5,
            borderColor: 'grey',
            backgroundColor: ['blue', 'yellow', 'red'],
          },
        ],
      },
    };
    this.pie = new Chart(this.pieContainer, this.pieConfig);
  }

  redirectToHome() {
    this._master.redirectToHome();
  }
}
