import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/_models';
//import { environment } from '@environments/environment';
import { ERRORS_CODE } from '../common/errorCode';
import { APP_CONFIG } from '../common/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {
  users: Observable<User[]>;
  newuser: User;
  constructor(private http: HttpClient) {

  }

  getUser() {
    return this.http.get<User[]>(APP_CONFIG.BASE_API_LINK.USER_GETALL);
  }

  AddUser(user: User) {debugger;

    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      Uname: user.userName, PWord: user.password, Email: user.emailAddress
    }
    console.log(APP_CONFIG.BASE_API_LINK.USER_ADD);

    return this.http.post<User>(APP_CONFIG.BASE_API_LINK.USER_ADD, body, { headers });

  }

  EditUser(user: User) {debugger;
    console.log(user);
    const params = new HttpParams().set('ID', user.id);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      Uname: user.userName, PWord: user.password, Email: user.emailAddress
    }
    return this.http.put<User>(APP_CONFIG.BASE_API_LINK.USER_UPDATE, body, { headers, params })

  }

  DeleteUser(user: User) {
    const params = new HttpParams().set('ID', user.id);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      Uname: user.userName, PWord: user.password, Email: user.emailAddress
    }
    return this.http.delete<User>(APP_CONFIG.BASE_API_LINK.USER_DELETE + '/Delete/' + user.id)

  }
}


