import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../Models/user.model';
// import { customValidator } from './customValidators';
interface logResponse {
  success: boolean;
  message: string;
  token: string;
}
interface registerResponse {
  success: boolean;
  message: string;
  data: Error | { username: string; id: string };
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  error = false;
  // message: any = '';
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  router = inject(Router);
  ngOnInit(): void {
    // this._logService.check();
  }
  errorMessage: any = '';
  tag: any;
  constructor(private _logService: LoginService) {}
  // currUser: User;
  register() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    let username = this.loginForm.value.username ?? '';
    let password = this.loginForm.value.password ?? '';
    let currUser = new User();
    currUser.username = username;
    currUser.password = password;
    this._logService.register(currUser).subscribe((res) => {
      const userResponse = res as registerResponse;
      if (userResponse.data) {
        if ('username' in userResponse.data && 'id' in userResponse.data) {
          console.log(
            `User created with Username: ${userResponse.data.username}, ID: ${userResponse.data.id}`
          );
        } else {
          console.log('Error:', userResponse.data.message);
        }
      } else {
        console.log('Error: Response does not contain user information.');
      }
    });
    this.toolbarName = 'Login/Register';
    this.loginForm.reset(new User());
  }
  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    let username = this.loginForm.value.username ?? '';
    let password = this.loginForm.value.password ?? '';
    let currUser = new User();
    currUser.username = username;
    currUser.password = password;
    this._logService.login(currUser).subscribe(
      (res) => {
        const resp = res as logResponse;
        if (resp.success) {
          // console.log('Response:', resp);
          localStorage.setItem('token', resp.token);
          this.router.navigateByUrl('home');
        } else {
          console.log('In the else part');
        }
      },
      (err) => {
        // Error handling
        if (err.error && err.error.message) {
          // console.log('Error:', err.error.message);
          this.errorMessage = '*' + err.error.message;
          if (this.errorMessage == '*No user Found') {
            this.tag = 'u';
          }
          if (this.errorMessage == '*Incorrect Password') {
            this.tag = 'p';
          }
        } else {
          console.log('Error:', err.message);
        }
      }
    );
  }
  getErrorMessage(type: string) {
    if (this.loginForm.get(type)?.hasError('required')) {
      return '*Cannot be empty';
    }

    return;
  }

  toolbarName = 'Login/Register';
  toggleName(e: Event, x: string) {
    e.stopPropagation();
    this.toolbarName = x;
  }
  action() {
    if (this.toolbarName === 'Login') this.login();
    if (this.toolbarName === 'Register') this.register();
  }
  goBack() {
    this.toolbarName = 'Login/Register';
    this.loginForm.reset(new User())
  }
}
