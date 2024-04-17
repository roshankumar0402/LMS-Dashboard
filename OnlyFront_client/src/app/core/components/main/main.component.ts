import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
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
    FormsModule,
    MatMenuModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatTableModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(private _master: MasterService, private router: Router) {}
  genres: any[] = [];
  books: any[] = [];
  filteredBooks: any[] = [];
  ngOnInit(): void {
    this.books = this._master.getBooks();
    this.genres = this._master.getGenres();
  }
  openDialog() {
    this.redirectToHome();
    this.books = this._master.openDialog();
  }
  genreAction(type: string) {
    this.router.navigate(['table'], { queryParams: { genre: type } });
  }

  recent(type: string) {
    this.router.navigate(['table'], { queryParams: { duration: type } });
  }
  goToFavPage() {
    this.router
      .navigate(['home'])
      .then(() =>
        this.router.navigate(['table'], { queryParams: { favorites: '' } })
      );
  }
  goToArchivesPage() {
    this.router
      .navigate(['home'])
      .then(() =>
        this.router.navigate(['table'], { queryParams: { archives: '' } })
      );
  }
  goToDashboard() {
    this._master.goToDashboard();
  }
  redirectToHome() {
    this._master.redirectToHome();
  }
}
