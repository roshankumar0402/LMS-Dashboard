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
import { customValidator } from './customValidators';

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
  // hide = true;
  error = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  router = inject(Router);
  ngOnInit(): void {
    this._logService.check();
  }
  errorMessage: any;
  tag: any;
  constructor(private _logService: LoginService) {}
  login() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    let username = this.loginForm.value.username ?? '';
    let password = this.loginForm.value.password ?? '';
    const log = this._logService.login(username, password);
    if (log === true) {
      this.router.navigateByUrl('home');
    } else {
      this.errorMessage = log;
      this.error = true;
      if (this.errorMessage == '*Wrong Username') {
        this.tag = 'u';
      } else {
        this.tag = 'p';
      }
    }
  }
  getErrorMessage(type: string) {
    if (this.loginForm.get(type)?.hasError('required')) {
      return '*Cannot be empty';
    }
    // if (this.loginForm.get(type)?.hasError('usernameCheck')) {
    //   return '*Wrong Username';
    // }
    // if (this.loginForm.get(type)?.hasError('passwordCheck')) {
    //   return '*Wrong Password';
    // }
    return;
  }
}
