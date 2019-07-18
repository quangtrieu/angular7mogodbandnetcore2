import { Routes } from '@angular/router';
import { UserSearchComponent } from '../usersearch/usersearch.component'


import { HomeComponent } from '../home/home.component';

export const ApplicationRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'user-search', component: UserSearchComponent },

];

