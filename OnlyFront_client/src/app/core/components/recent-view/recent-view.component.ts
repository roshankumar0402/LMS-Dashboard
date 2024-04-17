import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MasterService } from '../../services/master.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterOutlet,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Books } from '../book-modal/book';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-recent-view',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    RouterOutlet,
    CommonModule,
    RouterLink,
    NavbarComponent,
  ],
  templateUrl: './recent-view.component.html',
  styleUrl: './recent-view.component.scss',
})
export class RecentViewComponent implements OnInit {
  books: any[] = [];
  booksToDisp!: Books[];
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _service: MasterService,
    private router: Router,
    private url: ActivatedRoute
  ) {}
  duration: any;
  ngOnInit(): void {
    this.url.queryParams.subscribe((params) => {
      this.duration = params['duration'];
    });
    this.books = this._service.getBooks();
    const currentTime = new Date().getTime();
    let timeThreshold: number;
    switch (this.duration) {
      case '10':
        timeThreshold = currentTime - 10 * 60 * 1000; //10 * 60 * 1000;
        break;
      case '1hr':
        timeThreshold = currentTime - 60 * 60 * 1000; // 60 * 60 * 1000;
        break;
      case '5hr':
        timeThreshold = currentTime - 5 * 60 * 60 * 1000;
        break;
      default:
        return;
    }
    this.booksToDisp = this.books.filter(
      (book) => book.lastViewedTime >= timeThreshold
    );
    this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.sort.sort({
      id: 'title',
      start: 'asc',
      disableClear: false,
    });
  }

  columns = [
    'title',
    'author',
    'desc',
    'genre',
    'price',
    'pages',
    'rating',
    'action',
  ];

  redirectToHome() {
    this.router.navigateByUrl('home');
  }

  toggleFav(event: Event, key: string) {
    event.stopPropagation();
    const currBook = this.books.find((b) => b.id == key);
    if (currBook) {
      currBook.favorite = true;
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.router.navigate(['recent'], {
      queryParams: { duration: this.duration },
    });
  }

  toggleArchive(event: Event, key: string) {
    event.stopPropagation();
    const currBook = this.books.find((b) => b.id == key);
    if (currBook) {
      currBook.archive = true;
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.router.navigate(['recent'], {
      queryParams: { duration: this.duration },
    });
  }
  openModalRec(row: any) {
    this.books = this._service.openModalGen(
      row.id,
      'recent',
      'duration',
      this.duration
    );
    const currentTime = new Date().getTime();
    let timeThreshold: number;
    switch (this.duration) {
      case '10':
        timeThreshold = currentTime - 10 * 60 * 1000; //10 * 60 * 1000;
        break;
      case '1hr':
        timeThreshold = currentTime - 60 * 60 * 1000; // 60 * 60 * 1000;
        break;
      case '5hr':
        timeThreshold = currentTime - 5 * 60 * 60 * 1000;
        break;
      default:
        return;
    }
    this.booksToDisp = this.books.filter(
      (book) => book.lastViewedTime >= timeThreshold
    );
    this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
  }
}
