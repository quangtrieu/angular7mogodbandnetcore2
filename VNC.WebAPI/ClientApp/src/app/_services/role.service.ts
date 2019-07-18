import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../common/config';
import { Role } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRolesList() {
    return this.http.get<Role[]>(APP_CONFIG.BASE_API_LINK.TOKEN_GETTOKEN_ROLE);
  }

  AllRoleDetails(): Observable<Role[]> {
    return this.http.get<Role[]>(APP_CONFIG.BASE_API_LINK.TOKEN_GETTOKEN_ROLE)
  }

  
  getRoleById(id: string): Observable<Role> {
    return this.http.get<Role>(APP_CONFIG.BASE_API_LINK.TOKEN_GETTOKEN_ROLE_DETAIL + id);
  }

  createRole(role: Object): Observable<Object> {
    return this.http.post(APP_CONFIG.BASE_API_LINK.TOKEN_GETTOKEN_ROLE_CREATE, role);
  }

  updateRole(id: string, value: any): Observable<Object> {
    return this.http.put(APP_CONFIG.BASE_API_LINK.TOKEN_GETTOKEN_ROLE_UPDATE + id, value);
  }

  update(role: Role): Observable<Role> {
    /* const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; */
    return this.http.put<Role>(APP_CONFIG.BASE_API_LINK.TOKEN_GETTOKEN_ROLE_UPDATE, role);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(APP_CONFIG.BASE_API_LINK.TOKEN_GETTOKEN_ROLE_DELETE + id);
  }
}
