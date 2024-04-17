import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _http: HttpClient) {}
  readonly baseURL_Login = 'http://localhost:3000/api/users/login';
  readonly baseURL_Register = 'http://localhost:3000/api/users/register';

  login(x: any) {
    return this._http.post(this.baseURL_Login, x);
    // .pipe(catchError(this.handleError));
  }

  register(x: any) {
    return this._http.post(this.baseURL_Register, x);
    // .pipe(catchError(this.handleError));
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
