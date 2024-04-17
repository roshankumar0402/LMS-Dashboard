import { Injectable } from '@angular/core';
import { AddBookModalComponent } from '../components/add-book-modal/add-book-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewBookModalComponent } from '../components/view-book-modal/view-book-modal.component';
import { Subject } from 'rxjs';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { Book } from '../Models/book.model';
import { BooksService } from './books.service';
import { Genre } from '../Models/genre.model';
import { GenresService } from './genres.service';
import { AddGenreModalComponent } from '../components/add-genre-modal/add-genre-modal.component';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _bookService: BooksService,
    private _genreService: GenresService
  ) {}
  books: Book[] = [];
  book = new Book();
  genres: Genre[] = [];
  genre = new Genre();
  openDialog() {
    this.getBook();
    const dialogRef = this.dialog.open(AddBookModalComponent, {
      data: {
        title: this.book.title,
        author: this.book.author,
        desc: this.book.desc,
        genre: this.book.genre,
        rating: this.book.rating,
        price: this.book.price,
        pages: this.book.pages,
      },
    });

    return dialogRef.afterClosed();
  }

  openGenreDialog() {
    this.getGenre();
    const dialogRef = this.dialog.open(AddGenreModalComponent, {
      data: {
        name: this.genre.name,
        icon: this.genre.icon,
      },
    });

    return dialogRef.afterClosed();
  }

  openModalGen(key: Book, url: string, subKey: string, subVal: string) {
    let x;
    let viewBook = key;
    if (viewBook !== undefined) {
      const dialogRef = this.dialog.open(ViewBookModalComponent, {
        data: {
          title: viewBook.title,
          author: viewBook.author,
          desc: viewBook.desc,
          genre: viewBook.genre,
          rating: viewBook.rating,
          price: viewBook.price,
          pages: viewBook.pages,
          favorite: viewBook.favorite,
          archive: viewBook.archive,
          url: url,
          subKey: subKey,
          subVal: subVal,
          id: viewBook._id,
        },
      });
      x = dialogRef.afterClosed();
    }
    return x;
  }

  confirmDialog() {
    const dialogRef = this.dialog.open(ConfirmComponent);
    return dialogRef.afterClosed();
  }

  genresStringArray: string[] = [];

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
}
