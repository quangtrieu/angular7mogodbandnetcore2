import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from '../common/config';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(APP_CONFIG.BASE_API_LINK.USER_GETALL);
    }

    AllUserDetails(): Observable<User[]> {
      return this.http.get<User[]>(APP_CONFIG.BASE_API_LINK.USER_GETALL)
    }

    getById(id: string) {
        return this.http.get(`${environment.apiUrl}/api/User/GetUserDetail/${id}`);
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${environment.apiUrl}/api/User/GetUserId/${id}`);
      }

    getUserDetailById(id: string): Observable<User> {
      return this.http.get<User>(APP_CONFIG.BASE_API_LINK.USER_DETAIL + id);
    }

    register(user: User) {
      return this.http.post(APP_CONFIG.BASE_API_LINK.USER_REGISTER, user);
    }

    changepassword(user: User): Observable<User> {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.put<User>(APP_CONFIG.BASE_API_LINK.USER_CHANGE_PASSWORD, user, httpOptions);
    }

    createUser(user: Object): Observable<Object> {
        return this.http.post(APP_CONFIG.BASE_API_LINK.USER_ADD, user);
      }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/api/User/Update/${user.id}`, user);
    }

    updateUser(user: User): Observable<User> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<User>(`${environment.apiUrl}/api/User/UpdateDetails/`, user, httpOptions);
      }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/api/User/Delete/${id}`);
    }
}