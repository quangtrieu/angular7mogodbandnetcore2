import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERRORS_CODE } from '../common/errorCode';
import { APP_CONFIG } from '../common/config';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Token } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  getAllTokens(){
    return this.http.get<Token[]>(APP_CONFIG.BASE_API_LINK.TOKEN_GETTOKEN_ALL);
  }

  AllTokentails(): Observable<Token[]> {
    return this.http.get<Token[]>(APP_CONFIG.BASE_API_LINK.TOKEN_GETTOKEN_USER)
  }
}
