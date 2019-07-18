import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { APP_CONFIG } from '../common/config';
import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { UserViewModel } from '../view-models/user.viewmodel';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
   // private currentUserSubject: BehaviorSubject<User>;
    private currentUserSubject: BehaviorSubject<UserViewModel>;
    public currentUser: Observable<UserViewModel>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserViewModel>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserViewModel {
        return this.currentUserSubject.value;
    }

    loginAuthen(username: string, password: string) {
        //return this.http.post()
        return this.http.post<any>(`${environment.USER_API_DATA}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    login(username: string, password: string) {
        return this.http.post<UserViewModel>(`${environment.USER_API_DATA}/api/Authentication/login`, { username, password })
            .pipe(map(userlogin => {
                console.log(userlogin);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(userlogin));
                this.currentUserSubject.next(userlogin);
                return userlogin;
            }));
    }

    loginVnc(username: string, password: string): Promise<any> {
        return this.http.post(APP_CONFIG.BASE_API_LINK.LOGIN, {username: username, password: password})
          .toPromise()
          .then((res) => {
            return res.toString();
          })
      }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}