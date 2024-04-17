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
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { Books } from '../book-modal/book';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-favorites',
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
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  books: any[] = [];
  booksToDisp!: Books[];
  dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _service: MasterService) {}

  ngOnInit(): void {
    this.books = this._service.getBooks();
    this.booksToDisp = this.books.filter((book) => book.favorite == true);
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
  router = inject(Router);

  redirectToHome() {
    this.router.navigateByUrl('home');
  }

  removeFav(event: Event, key: string) {
    event.stopPropagation();
    const currBook = this.books.find((b) => b.id == key);
    if (currBook) {
      currBook.favorite = false;
    }
    localStorage.setItem('bookList', JSON.stringify(this.books));
    this.books = this._service.getBooks();
    this.booksToDisp = this.books.filter((book) => book.favorite == true);
    this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
  }
  openModal(row: any) {
    this.books = this._service.openModal(row.id, 'favorites');
    this.booksToDisp = this.books.filter((book) => book.favorite === true);
    this.dataSource = new MatTableDataSource<Books>(this.booksToDisp);
  }
}
