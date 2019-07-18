import { BrowserModule } from '@angular/platform-browser';  
import { ReactiveFormsModule }    from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';  
import {UserService} from './_services/user.service';
import {UserDataServiceService} from './_services/user-data-service.service';
import {  
  MatButtonModule, MatMenuModule, MatDatepickerModule,MatNativeDateModule , MatIconModule, MatCardModule, MatSidenavModule,MatFormFieldModule,  
  MatInputModule, MatTooltipModule, MatToolbarModule  
} from '@angular/material';  
import { MatRadioModule } from '@angular/material/radio';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { AngularmaterialModule } from './material/angularmaterial/angularmaterial.module';
import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';;
import { TokenComponent } from './token/token.component';
import { routing }        from './app.routing';
import { AppComponent } from './app.component';  
import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { TokenListComponent } from './token-list/token-list.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeChangepasswordComponent } from './employee-changepassword/employee-changepassword.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatRadioModule,
        MatCardModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatTooltipModule,
        MatToolbarModule,
        routing,
        FormsModule,
        AngularmaterialModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TokenComponent ,
        RoleListComponent,
        RoleDetailsComponent,
        CreateRoleComponent ,
        EditRoleComponent ,
        TokenListComponent ,
        EmployeeListComponent,
        EmployeeEditComponent,
        EmployeeAddComponent ,
        EmployeeChangepasswordComponent ,
        EmployeeDetailsComponent  
    ],
        
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        UserService,UserDataServiceService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }