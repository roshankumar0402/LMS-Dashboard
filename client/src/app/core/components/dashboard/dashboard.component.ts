import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Chart, LinearScale, TimeScale, ChartConfiguration } from 'chart.js';
import { registerables } from 'chart.js';
import { MasterService } from '../../services/master.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Genre } from '../../Models/genre.model';
import { GenresService } from '../../services/genres.service';
import { Book } from '../../Models/book.model';
import { BooksService } from '../../services/books.service';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  genres: Genre[] = [];
  books: Book[] = [];
  pieContainer: any;
  lineContainer: any;
  pieConfig: any;
  chartData: number[] = [];
  chartDatalabels: any[] = [];
  pie: any;
  line: Chart | undefined;
  genresStringArray: string[] = [];
  constructor(
    private _master: MasterService,
    private router: Router,
    private _genreService: GenresService,
    private _bookService: BooksService
  ) {}
  @ViewChild('myChart') myChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myChart2') myChart2Canvas!: ElementRef<HTMLCanvasElement>;
  ngAfterViewInit() {
    // this.pieContainer = document.getElementById('myChart');
    this.generatePie();
  }
  generatePie() {
    this.chartData = this.getGenreCount();
    this.chartDatalabels = this.getGenresArray();

    const pieCanvas = this.myChartCanvas.nativeElement;
    this.pieContainer = pieCanvas.getContext('2d');

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
            backgroundColor: this.getBgColor(this.chartDatalabels),
          },
        ],
      },
    };
    this.pie = new Chart(this.pieContainer, this.pieConfig);
  }

  colors: string[] = [
    'red',
    'yellow',
    'blue',
    'green',
    'orange',
    'purple',
    'cyan',
    'pink',
    'brown',
    'teal',
    'indigo',
    'lime',
    'amber',
    'maroon',
    'violet',
    'turquoise',
    'salmon',
    'lavender',
    'olive',
    'magenta',
    'peach',
    'navy',
    'gold',
    'silver',
    'crimson',
  ];

  getBgColor(x: string[]): string[] {
    const bgColorArray: string[] = [];
    let colorIndex = 0;
    for (const item of x) {
      if (colorIndex >= this.colors.length) {
        colorIndex = 0;
      }
      bgColorArray.push(this.colors[colorIndex]);
      colorIndex++;
    }
    return bgColorArray;
  }

  redirectToHome() {
    this.router.navigateByUrl('home');
  }
  getGenresArray(): string[] {
    this.getGenre();
    this.genresStringArray = this.genres.map((genre) => genre.name);
    return this.genresStringArray;
  }
  getGenre() {
    this._genreService.fetchGenreList().subscribe((res) => {
      this.genres = res as Genre[];
    });
  }

  getGenreCount(): number[] {
    this.getGenre();
    this.getBook();
    let genreCounts: { [genre: string]: number } = {};
    this.genres.forEach((genre) => {
      genreCounts[genre.name] = 0;
    });
    this.books.forEach((book) => {
      if (genreCounts.hasOwnProperty(book.genre) && book.archive == false) {
        genreCounts[book.genre]++;
      }
    });
    const countArray: number[] = this.genres.map(
      (genre) => genreCounts[genre.name]
    );
    return countArray;
  }
  getBook() {
    this._bookService.fetchBookList().subscribe((res) => {
      this.books = res as Book[];
    });
  }
}
