import { Component, Inject, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { BooksService } from '../../services/books.service';
import { GenresService } from '../../services/genres.service';
export interface DialogData {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-add-genre-modal',
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
  templateUrl: './add-genre-modal.component.html',
  styleUrl: './add-genre-modal.component.scss',
})
export class AddGenreModalComponent implements OnInit {
  addGenreForm!: FormGroup;
  message: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddGenreModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _bookService: BooksService,
    private _genreService: GenresService
  ) {}

  ngOnInit(): void {
    this.addGenreForm = this.formBuilder.group({
      name: ['', Validators.required],
      icon: [''],
    });
  }

  materialIcons: string[] = [
    'add',
    'alarm',
    'book',
    'check',
    'delete',
    'edit',
    'favorite',
    'home',
    'info',
    'lock',
    'mail',
    'notifications',
    'people',
    'question_answer',
    'search',
    'settings',
    'star',
    'visibility',
    'attach_file',
    'cloud',
    'download',
    'explore',
    'error',
    'exit_to_app',
    'help',
    'menu',
    'person',
    'refresh',
    'save',
    'share',
    'thumb_up',
    'warning',
  ];
  getIcon(x: string) {
    if (!x || !this.materialIcons.includes(x)) {
      return 'star';
    }
    return x;
  }
  addGenre(): void {
    this.addGenreForm.markAllAsTouched();

    if (this.addGenreForm.valid) {
      this.data.name = this.addGenreForm.value.name;
      this.data.icon = this.getIcon(this.addGenreForm.value.icon);
      this.message = 'Genre Added!';
      setTimeout(() => {
        this.dialogRef.close(this.data);
      }, 1800);
    } else {
      console.log('Form is Invalid');
    }
  }

  getErrorMessage(controlName: string) {
    const control = this.addGenreForm.get(controlName);

    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
