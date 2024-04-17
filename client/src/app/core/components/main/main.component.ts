import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../navbar/navbar.component';
import { GenresService } from '../../services/genres.service';
import { Genre } from '../../Models/genre.model';
import { BooksService } from '../../services/books.service';
import { Book } from '../../Models/book.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    NavbarComponent,
    MatListModule,
    CommonModule,
    RouterLink,
    FormsModule,
    MatMenuModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatTableModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(
    private _genreService: GenresService,
    private router: Router,
    private _bookService: BooksService,
    private _master: MasterService
  ) {}
  genres: Genre[] = [];
  books: Book[] = [];

  ngOnInit(): void {
    this.router.navigateByUrl('home');
    this.getGenre();
    this.getBook();
  }

  getGenre() {
    this._genreService.fetchGenreList().subscribe((res) => {
      this.genres = res as Genre[];
    });
  }
  getBook() {
    this._bookService.fetchBookList().subscribe((res) => {
      this.books = res as Book[];
    });
  }
  openDialog() {
    this.router.navigateByUrl('home');
    this._master.openDialog().subscribe((result) => {
      if (result !== undefined) {
        let book = new Book();
        book.title = result.title;
        book.author = result.author;
        book.desc = result.desc;
        book.genre = result.genre;
        book.rating = result.rating;
        book.price = result.price;
        book.pages = result.pages;
        book.createdTime = new Date().getTime();
        book.lastViewedTime = new Date().getTime();
        book.favorite = false;
        book.archive = false;

        this._bookService.postBook(book).subscribe((res) => {
          this.getBook();
        });
      }
    });
  }

  genreAction(type: string) {
    this.router.navigate(['table'], { queryParams: { genre: type } });
  }
  recent(type: string) {
    this.router.navigate(['table'], { queryParams: { duration: type } });
  }
  goToFavPage() {
    this.router
      .navigate(['home'])
      .then(() =>
        this.router.navigate(['table'], { queryParams: { favorites: '' } })
      );
  }
  goToArchivesPage() {
    this.router
      .navigate(['home'])
      .then(() =>
        this.router.navigate(['table'], { queryParams: { archives: '' } })
      );
  }
  goToDashboard() {
    // this.router
    //   .navigate(['home'])
    // .then(() =>
    this.router.navigateByUrl('dashboard');
    // );
    // setTimeout(() => {
    //   this.router.navigateByUrl('dashboard');
    // }, 100);
  }
  redirectToHome() {
    this.router.navigateByUrl('home');
  }
}
