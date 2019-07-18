import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

import { AuthGuard } from './_guards';
import { TokenComponent } from './token/token.component'
import { TokenListComponent } from './token-list/token-list.component';


import { RoleListComponent } from './role-list/role-list.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { EditRoleComponent } from './edit-role/edit-role.component';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeChangepasswordComponent } from './employee-changepassword/employee-changepassword.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path:'RoleList',component:RoleListComponent, canActivate: [AuthGuard]},
    { path:'Add-Role',component:CreateRoleComponent, canActivate: [AuthGuard]},
    { path: 'edit-role/:id', component: EditRoleComponent, canActivate: [AuthGuard] },
    { path: 'details/:id', component: RoleDetailsComponent, canActivate: [AuthGuard] },
    { path: 'Employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] },
    { path: 'employee-add', component: EmployeeAddComponent, canActivate: [AuthGuard] },
    { path: 'employee-edit/:id', component: EmployeeEditComponent, canActivate: [AuthGuard] },
    { path: 'changePassword/:id', component: EmployeeChangepasswordComponent, canActivate: [AuthGuard] },
    { path: 'userDetails/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
    { path: 'TokenList', component: TokenListComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);