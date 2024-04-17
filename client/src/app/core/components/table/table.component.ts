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
import { Book } from '../../Models/book.model';
import { BooksService } from '../../services/books.service';
import { GenresService } from '../../services/genres.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
    MatPaginatorModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  books: Book[] = [];
  booksToDisp!: Books[];
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private _service: MasterService,
    private router: Router,
    private url: ActivatedRoute,
    private _bookService: BooksService,
    private _genreService: GenresService
  ) {}
  key: any;
  type: any;
  ngOnInit(): void {
    this.url.queryParams.subscribe((params) => {
      this.key = Object.keys(params)[0];
      this.type = params[this.key];
      this.getBook();
    });
  }
  getBooksToDisp(isModified: boolean = false) {
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
        this.booksToDisp = this.books.filter(
          (book) => book.favorite == true && book.archive === false
        );

        break;
      case 'archives':
        this.booksToDisp = this.books.filter((book) => book.archive == true);
        break;
      default:
        alert('Error');
        this.router.navigateByUrl('home');
    }
    if (isModified) {
      // console.log(this.dataSource);
      this.dataSource.data = this.booksToDisp;
    } else {
      this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
    }
  }

  sortFunc() {
    // console.log('Entered sort');

    this.dataSource.sort = this.sort;
    this.sort.sort({
      id: 'title',
      start: 'asc',
      disableClear: false,
    });
    this.dataSource.paginator = this.paginator;
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
  getBook() {
    this._bookService.fetchBookList().subscribe((res) => {
      this.books = res as Book[];
      this.getBooksToDisp();
      this.sortFunc();
    });
  }
  toggleFav(event: Event, id: string) {
    event.stopPropagation();
    const currBook = this.books.find((b) => b._id == id);
    if (currBook !== undefined) {
      currBook.favorite = !currBook.favorite;
    }
    this._bookService.putBook(id, currBook).subscribe((res) => {
      this.modifyBooksToDisp(id, currBook);
    });
  }

  toggleArchive(event: Event, id: string) {
    event.stopPropagation();
    const currBook = this.books.find((b) => b._id == id);
    this._service.confirmDialog().subscribe((result) => {
      if (result) {
        if (currBook) {
          currBook.archive = true;
        }
        this._bookService.putBook(id, currBook).subscribe((res) => {
          this.modifyBooksToDisp(id, currBook);
        });
      }
    });
  }

  modifyBooksToDisp(id: string, newBook: Book | undefined) {
    this.books = this.books.map((book) => {
      if (book._id === id && newBook !== undefined) {
        return newBook;
      }
      return book;
    });

    this.booksToDisp = this.booksToDisp.map((book) => {
      if (book._id === id && newBook !== undefined) {
        return newBook;
      }
      return book;
    });
    this.getBooksToDisp(true);
  }

  removeArchive(event: Event, id: string) {
    event.stopPropagation();
    this._service.confirmDialog().subscribe((result) => {
      if (result) {
        const currBook = this.books.find((b) => b._id == id);
        if (currBook) {
          currBook.archive = false;
        }
        this._bookService.putBook(id, currBook).subscribe((res) => {
          this.modifyBooksToDisp(id, currBook);
        });
      }
    });
  }

  openModal(row: any, event: Event) {
    if (!(this.key == 'archives')) {
      this._service
        .openModalGen(row, 'table', this.key, this.type)
        ?.subscribe((result) => {
          let viewBook = this.books.find((x) => x._id == row._id);
          if (result !== undefined && viewBook !== undefined) {
            viewBook.title = result.title;
            viewBook.author = result.author;
            viewBook.desc = result.desc;
            viewBook.genre = result.genre;
            viewBook.rating = result.rating;
            viewBook.price = result.price;
            viewBook.pages = result.pages;
            viewBook.lastViewedTime = new Date().getTime();
            viewBook.favorite = result.favorite;
            viewBook.archive = result.archive;
            this._bookService.putBook(row._id, viewBook).subscribe((res) => {
              this.modifyBooksToDisp(row._id, viewBook);
            });
          }
        });
    }
  }
}
