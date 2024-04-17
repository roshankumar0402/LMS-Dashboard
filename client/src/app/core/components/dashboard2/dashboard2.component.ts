import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { GenresService } from '../../services/genres.service';
import { BooksService } from '../../services/books.service';
import { Genre } from '../../Models/genre.model';
import { Book } from '../../Models/book.model';

@Component({
  selector: 'app-dashboard2',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, MatButtonModule, NgxChartsModule],
  templateUrl: './dashboard2.component.html',
  styleUrl: './dashboard2.component.scss',
})
export class Dashboard2Component implements OnInit {
  constructor(
    private router: Router,
    private _genreService: GenresService,
    private _bookService: BooksService
  ) {}

  view: any = [700, 370];

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date Added';
  yAxisLabel: string = 'Number of Books';
  timeline: boolean = true;

  showLegend: boolean = true;

  legendPosition: LegendPosition = LegendPosition.Below;

  gradient: boolean = false;
  isDoughnut: boolean = true;
  onSelect(event: Event) {
    console.log(event);
  }

  onActivate(data: Event): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: Event): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  PieChartData: { name: string; value: number }[] = [];
  lineChartData: { name: string; series: { name: string; value: number }[] }[] =
    [];
  genres: Genre[] = [];
  books: Book[] = [];
  colors: string[] = [
    'red',
    'blue',
    'green',
    'orange',
    'purple',
    'yellow',
    'cyan',
    'pink',
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
    'navy',
    'gold',
    'silver',
    'crimson',
  ];
  bgColor: string[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.getGenre();
  }

  generatePieChartData(): void {
    const genreCounts: { [genre: string]: number } = {};
    this.genres.forEach((genre) => {
      genreCounts[genre.name] = 0;
    });
    this.books.forEach((book) => {
      if (genreCounts.hasOwnProperty(book.genre) && !book.archive) {
        genreCounts[book.genre]++;
      }
    });
    this.PieChartData = this.genres.map((genre) => ({
      name: genre.name,
      value: genreCounts[genre.name],
    }));
  }

  getGenresArray(): string[] {
    return this.genres.map((genre) => genre.name);
  }

  getGenre(): void {
    this._genreService.fetchGenreList().subscribe((res) => {
      this.genres = res as Genre[];
      // this.generatePieChartData();
      this.getBook();
      this.bgColor = this.getBgColor(this.genres);
    });
  }
  colorScheme: any;
  getBook(): void {
    this._bookService.fetchBookList().subscribe((res) => {
      this.books = res as Book[];
      this.colorScheme = {
        domain: this.bgColor,
      };
      this.generateTimelineData(this.books);
      this.generatePieChartData();
    });
  }

  redirectToHome(): void {
    this.router.navigateByUrl('home');
  }

  getBgColor(x: Genre[]): string[] {
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
  generateTimelineData(books: Book[]): void {
    const timelineData: {
      name: string;
      series: { name: string; value: number }[];
    }[] = [];
    const datesMap: Map<string, number> = new Map();

    books.forEach((book) => {
      if (!book.archive) {
        const creationDate = new Date(book.createdTime);
        const dateString = this.getDateString(creationDate);

        if (!datesMap.has(dateString)) {
          datesMap.set(dateString, 1);
        } else {
          const currentValue = datesMap.get(dateString) || 0;
          datesMap.set(dateString, currentValue + 1);
        }
      }
    });

    let series: { name: string; value: number }[] = [];

    datesMap.forEach((value, dateString) => {
      series.push({ name: dateString, value: value });
    });

    timelineData.push({ name: 'Added Books', series: series });

    this.lineChartData = timelineData;
  }

  getDateString(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }
}
