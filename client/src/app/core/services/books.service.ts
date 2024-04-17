import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Book } from '../Models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private _http: HttpClient) {}
  readonly baseURL = 'http://localhost:3000/api/books/';

  list: Book[] = [];
  fetchBookList() {
    return this._http.get(this.baseURL).pipe(catchError(this.handleError));
  }

  postBook(x: any) {
    return this._http.post(this.baseURL, x).pipe(catchError(this.handleError));
  }

  deleteBook(id: string) {
    return this._http
      .delete(this.baseURL + id)
      .pipe(catchError(this.handleError));
  }

  putBook(id: string, x: any) {
    return this._http
      .put(this.baseURL + id, x)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
