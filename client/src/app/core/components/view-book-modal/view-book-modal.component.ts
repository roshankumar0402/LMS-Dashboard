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
import { MasterService } from '../../services/master.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { Book } from '../../Models/book.model';
export interface ViewDialogData {
  id: any;
  subVal: any;
  subKey: any;
  url: any;
  title: string;
  author: string;
  desc: string;
  genre: string;
  rating: number;
  price: number;
  pages: number;
  favorite: boolean;
  archive: boolean;
}
@Component({
  selector: 'app-view-book-modal',
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
    CommonModule,
    MatTooltipModule,
    FontAwesomeModule,
  ],
  templateUrl: './view-book-modal.component.html',
  styleUrl: './view-book-modal.component.scss',
})
export class ViewBookModalComponent implements OnInit {
  addBookForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ViewBookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewDialogData,
    private _master: MasterService,
    private _bookService: BooksService,
    private router: Router
  ) {}
  star = faStar;
  rating = this.data.rating;
  books: Book[] = [];
  setRating(num: number) {
    this.rating = num;
  }
  fav: boolean = false;
  arch: boolean = false;
  url: any;
  subKey: any;
  subVal: any;
  id: any;
  ngOnInit(): void {
    // let viewBook = this._master.getViewBook();
    this.addBookForm = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      author: [this.data.author, Validators.required],
      desc: [this.data.desc],
      genre: [this.data.genre, Validators.required],
      price: [this.data.price, Validators.required],
      pages: [this.data.pages, Validators.required],
    });
    this.fav = this.data.favorite;
    this.arch = this.data.archive;
    this.url = this.data.url;
    this.subKey = this.data.subKey;
    this.subVal = this.data.subVal;
    this.id = this.data.id;
  }

  addBook(): void {
    this.addBookForm.markAllAsTouched();

    if (this.addBookForm.valid) {
      const genre = this.addBookForm.value.genre;
      if (!genre) {
        console.error('Please select a genre.');
        return;
      }

      this.data.title = this.addBookForm.value.title;
      this.data.author = this.addBookForm.value.author;
      this.data.desc = this.addBookForm.value.desc;
      this.data.genre = genre;
      this.data.rating = this.rating;
      this.data.price = this.addBookForm.value.price ?? 0;
      this.data.pages = this.addBookForm.value.pages ?? 1;
      this.data.favorite = this.fav;
      this.data.archive = this.arch;
      this.dialogRef.close(this.data);
    } else {
      console.error('Form is not valid.');
    }
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }
  addFav(event: Event) {
    event.stopPropagation();
    this.fav = !this.fav;
  }

  addArch(event: Event) {
    event.stopPropagation();
    this._master.confirmDialog().subscribe((result) => {
      if (result) {
        this.data.archive = true;
        this.dialogRef.close(this.data);
      }
    });
  }
}
