import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { TableComponent } from './core/components/table/table.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { MainComponent } from './core/components/main/main.component';
import { Dashboard2Component } from './core/components/dashboard2/dashboard2.component';
import { authGuard } from './core/guards/auth.guard';
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
        path: 'dashboard',
        component: Dashboard2Component,
        title: 'Dashboard',
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
