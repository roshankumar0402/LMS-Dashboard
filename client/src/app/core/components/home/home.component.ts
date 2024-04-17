import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { Component, Inject, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { AddBookModalComponent } from '../add-book-modal/add-book-modal.component';
// import { v4 as uuidv4 } from 'uuid';
import { MasterService } from '../../services/master.service';
import { BooksService } from '../../services/books.service';
import { GenresService } from '../../services/genres.service';
import { Genre } from '../../Models/genre.model';
import { Book } from '../../Models/book.model';
import { Books } from '../book-modal/book';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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
    RouterOutlet,
    FormsModule,
    MatMenuModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatTableModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private _master: MasterService,
    private router: Router,
    private _bookService: BooksService,
    private _genreService: GenresService
  ) {}
  genres: Genre[] = [];
  books: Book[] = [];
  ngOnInit(): void {
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
  genreAction(type: string) {
    this.router.navigate(['table'], { queryParams: { genre: type } });
  }
  addNewGen() {
    this._master.openGenreDialog().subscribe((result: any) => {
      if (result !== undefined) {
        let genre = new Genre();
        genre.name = result.name;
        genre.icon = result.icon;
        this._genreService.postGenre(genre).subscribe((res) => {
          this.getGenre();
          this.router.navigateByUrl('home');
        });
      }
    });
  }
}
