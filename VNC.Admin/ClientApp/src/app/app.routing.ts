import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';

import { UserSearchComponent } from './usersearch/usersearch.component';
import { UserDetailComponent } from './userdetail/userdetail.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  //  { path: 'role-search', component: UserSearchComponent },
    { path: 'user-search', component: UserSearchComponent },
    { path: 'userdetail', component: UserDetailComponent },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);