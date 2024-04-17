import { Component, Inject, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BooksService } from '../../services/books.service';
import { GenresService } from '../../services/genres.service';
import { Genre } from '../../Models/genre.model';
export interface DialogData {
  title: string;
  author: string;
  desc: string;
  genre: string;
  rating: number;
  price: number;
  pages: number;
}
@Component({
  selector: 'app-add-book-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    FontAwesomeModule,
  ],
  templateUrl: './add-book-modal.component.html',
  styleUrl: './add-book-modal.component.scss',
})
export class AddBookModalComponent implements OnInit {
  addBookForm!: FormGroup;
  message: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _bookService: BooksService,
    private _genreService: GenresService
  ) {}
  star = faStar;
  rating = 0;
  setRating(num: number) {
    this.rating = num;
  }
  genres: any;
  ngOnInit(): void {
    this.addBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      desc: [''],
      genre: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      pages: ['', [Validators.required, Validators.min(1)]],
      // rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
    this.getGenre();
  }
  getGenre() {
    this._genreService.fetchGenreList().subscribe((res) => {
      this.genres = res as Genre[];
    });
  }

  genreError = false;
  genreErrorMessage = '';
  addBook(): void {
    this.addBookForm.markAllAsTouched();

    if (this.addBookForm.valid) {
      const genre = this.addBookForm.value.genre;
      if (!genre) {
        this.genreError = true;
        this.genreErrorMessage = 'Please Choose a Genre';
        return;
      }

      this.data.title = this.addBookForm.value.title;
      this.data.author = this.addBookForm.value.author;
      this.data.desc = this.addBookForm.value.desc;
      this.data.genre = genre;
      this.data.rating = this.rating;
      this.data.price = this.addBookForm.value.price ?? 0;
      this.data.pages = this.addBookForm.value.pages ?? 1;
      this.message = 'Book Added!';

      setTimeout(() => {
        this.dialogRef.close(this.data);
      }, 1800);
    } else {
      console.log('Form is Invalid');
    }
  }

  getErrorMessage(controlName: string) {
    const control = this.addBookForm.get(controlName);

    if (control?.hasError('required')) {
      return 'You must enter a value';
    }

    if (control?.hasError('min')) {
      switch (controlName) {
        case 'price':
          return 'Price must be greater than or equal to 0';
        case 'pages':
          return 'No. of pages must be greater than or equal to 1';
        // case 'rating':
        //   return 'Rating must be greater than or equal to 1';
        default:
          return '';
      }
    }

    // if (control?.hasError('max')) {
    //   if (controlName === 'rating') {
    //     return 'Rating must be less than or equal to 5';
    //   }
    // }

    return '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
