import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  router = inject(Router);
  constructor(private _logService: LoginService) {}

  user: any = '';
  ngOnInit(): void {
    this.user = this.getCurrUser();
  }
  signOut() {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('login');
    } else {
      console.log('Error: token not present in localstorage');
    }
  }
  async getCurrUser() {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // const decodedToken = jwtDecode(token);
        // // console.log(decodedToken);
        const name = (await jwtDecode(token)) as { username: string };
        // console.log(name.username);

        this.user = {
          name: name.username,
          email: name.username + '@abc.com',
        };
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      // console.log('Token is not present');
    }
  }
}
