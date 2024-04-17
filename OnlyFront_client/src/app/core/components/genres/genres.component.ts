import { Component } from '@angular/core';
import { Books } from '../book-modal/book';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
})
export class GenresComponent {
  books: any[] = [];
  booksToDisp!: Books[];
  dataSource: any;
}
