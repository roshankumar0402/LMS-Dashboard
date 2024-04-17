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
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
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
    MatTooltipModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  books: any[] = [];
  booksToDisp!: Books[];
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _service: MasterService,
    private router: Router,
    private url: ActivatedRoute
  ) {}
  // genre: any;
  key: any;
  type: any;
  ngOnInit(): void {
    this.url.queryParams.subscribe((params) => {
      this.key = Object.keys(params)[0];
      this.type = params[this.key];
      this.books = this._service.getBooks();
      switch (this.key) {
        case 'genre':
          let currGenre = this.type;
          this.booksToDisp = this.books.filter(
            (book) => book.genre === currGenre && book.archive === false
          );
          break;
        case 'duration':
          let duration = this.type;
          const currentTime = new Date().getTime();
          let timeThreshold: number;
          switch (duration) {
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
            (book) =>
              book.lastViewedTime >= timeThreshold && book.archive === false
          );
          this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
          break;
        case 'favorites':
          this.books = this._service.getBooks();
          this.booksToDisp = this.books.filter(
            (book) => book.favorite == true && book.archive === false
          );
          break;
        case 'archives':
          this.books = this._service.getBooks();
          this.booksToDisp = this.books.filter((book) => book.archive == true);
          break;
        default:
          alert('Error');
          this.router.navigateByUrl('home');
      }
    });
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
  // ngOnChanges() {
  //   this.url.queryParams.subscribe((params) => {
  //     this.key = Object.keys(params)[0];
  //     this.type = params[this.key];
  //     this.books = this._service.getBooks();
  //     switch (this.key) {
  //       case 'genre':
  //         let currGenre = this.type;
  //         this.booksToDisp = this.books.filter(
  //           (book) => book.genre === currGenre && book.archive === false
  //         );
  //         break;
  //       case 'duration':
  //         let duration = this.type;
  //         const currentTime = new Date().getTime();
  //         let timeThreshold: number;
  //         switch (duration) {
  //           case '10':
  //             timeThreshold = currentTime - 10 * 60 * 1000; //10 * 60 * 1000;
  //             break;
  //           case '1hr':
  //             timeThreshold = currentTime - 60 * 60 * 1000; // 60 * 60 * 1000;
  //             break;
  //           case '5hr':
  //             timeThreshold = currentTime - 5 * 60 * 60 * 1000;
  //             break;
  //           default:
  //             return;
  //         }
  //         this.booksToDisp = this.books.filter(
  //           (book) =>
  //             book.lastViewedTime >= timeThreshold && book.archive === false
  //         );
  //         this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
  //         break;
  //       case 'favorites':
  //         this.books = this._service.getBooks();
  //         this.booksToDisp = this.books.filter(
  //           (book) => book.favorite == true && book.archive === false
  //         );
  //         break;
  //       case 'archives':
  //         this.books = this._service.getBooks();
  //         this.booksToDisp = this.books.filter((book) => book.archive == true);
  //         break;
  //       default:
  //         alert('Error');
  //         this.router.navigateByUrl('home');
  //     }
  //   });
  //   this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
  // }
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

  toggleFav(event: Event, id: string) {
    event.stopPropagation();
    const currBook = this.books.find((b) => b.id == id);
    if (currBook) {
      currBook.favorite = !currBook.favorite;
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.books = this._service.getBooks();
    switch (this.key) {
      case 'genre':
        let currGenre = this.type;
        this.booksToDisp = this.books.filter(
          (book) => book.genre === currGenre && book.archive === false
        );
        break;
      case 'duration':
        let duration = this.type;
        const currentTime = new Date().getTime();
        let timeThreshold: number;
        switch (duration) {
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
          (book) =>
            book.lastViewedTime >= timeThreshold && book.archive === false
        );
        this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
        break;
      case 'favorites':
        this.books = this._service.getBooks();
        this.booksToDisp = this.books.filter(
          (book) => book.favorite == true && book.archive === false
        );
        break;
      case 'archives':
        this.books = this._service.getBooks();
        this.booksToDisp = this.books.filter((book) => book.archive == true);
        break;
      default:
        alert('Error');
        this.router.navigateByUrl('home');
    }
    this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
    this.router.navigate(['table'], { queryParams: { [this.key]: this.type } });
  }

  toggleArchive(event: Event, id: string) {
    event.stopPropagation();
    this._service.confirmDialog().subscribe((result) => {
      if (result) {
        const currBook = this.books.find((b) => b.id == id);
        if (currBook) {
          currBook.archive = true;
        }
        localStorage.setItem('bookList', JSON.stringify(this.books));
        this.books = this._service.getBooks();
        switch (this.key) {
          case 'genre':
            let currGenre = this.type;
            this.booksToDisp = this.books.filter(
              (book) => book.genre === currGenre && book.archive === false
            );
            break;
          case 'duration':
            let duration = this.type;
            const currentTime = new Date().getTime();
            let timeThreshold: number;
            switch (duration) {
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
              (book) =>
                book.lastViewedTime >= timeThreshold && book.archive === false
            );
            break;
          case 'favorites':
            this.books = this._service.getBooks();
            this.booksToDisp = this.books.filter(
              (book) => book.favorite == true && book.archive === false
            );
            break;
          case 'archives':
            this.books = this._service.getBooks();
            this.booksToDisp = this.books.filter(
              (book) => book.archive == true
            );
            break;
          default:
            alert('Error');
            this.router.navigateByUrl('home');
        }
        this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
        this.router.navigate(['table'], {
          queryParams: { [this.key]: this.type },
        });
      }
    });
  }
  removeArchive(event: Event, id: string) {
    event.stopPropagation();
    this._service.confirmDialog().subscribe((result) => {
      if (result) {
        const currBook = this.books.find((b) => b.id == id);
        if (currBook) {
          currBook.archive = false;
        }
        localStorage.setItem('bookList', JSON.stringify(this.books));
        this.books = this._service.getBooks();
        this.booksToDisp = this.books.filter((book) => book.archive == true);
        this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
        this.router.navigate(['table'], {
          queryParams: { [this.key]: this.type },
        });
      }
    });
  }

  openModal(row: any) {
    if (!(this.key == 'archives' || this.key == 'favorites')) {
      this.books = this._service.openModalGen(
        row.id,
        'table',
        this.key,
        this.type
      );

      switch (this.key) {
        case 'genre':
          let currGenre = this.type;
          this.booksToDisp = this.books.filter(
            (book) => book.genre === currGenre && book.archive === false
          );
          break;
        case 'duration':
          let duration = this.type;
          const currentTime = new Date().getTime();
          let timeThreshold: number;
          switch (duration) {
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
            (book) =>
              book.lastViewedTime >= timeThreshold && book.archive === false
          );
          this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
          break;
        case 'favorites':
          this.books = this._service.getBooks();
          this.booksToDisp = this.books.filter(
            (book) => book.favorite == true && book.archive === false
          );
          break;
        case 'archives':
          this.books = this._service.getBooks();
          this.booksToDisp = this.books.filter((book) => book.archive == true);
          break;
        default:
          alert('Error');
          this.router.navigateByUrl('home');
      }
      this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
    }
  }
}
