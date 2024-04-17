import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './core/components/login/login.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { TableComponent } from './core/components/table/table.component';
import { FavoritesComponent } from './core/components/favorites/favorites.component';
import { ArchivesComponent } from './core/components/archives/archives.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { RecentViewComponent } from './core/components/recent-view/recent-view.component';
import { MainComponent } from './core/components/main/main.component';
import { logcheckGuard } from './core/guards/logcheck.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: 'table',
        component: TableComponent,
        title: 'Table',
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        title: 'Favorites',
      },
      {
        path: 'archives',
        component: ArchivesComponent,
        title: 'Archives',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'recent',
        component: RecentViewComponent,
        title: 'Recent',
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [logcheckGuard],
  },
  { path: '**', component: PageNotFoundComponent, title: 'Error' },
];
