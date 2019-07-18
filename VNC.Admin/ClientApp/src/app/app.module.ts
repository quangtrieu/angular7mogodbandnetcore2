import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AuthGuard } from './_helpers';
import { HttpService } from './services/http.service';
import { AlertService } from './services/alert.service';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { UserSearchComponent } from './usersearch/usersearch.component';
import { UserDetailComponent } from './userdetail/userdetail.component';
import { RouterModule } from '@angular/router';

import { ApplicationRoutes } from './routing/routing.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
       // RouterModule.forRoot(ApplicationRoutes),
        HttpClientModule,
        appRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        UserSearchComponent,
        UserDetailComponent
      ],
    exports: [RouterModule, HttpClientModule, BrowserAnimationsModule],
    providers: [HttpService, AlertService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        //fakeBackendProvider
       // AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }