
import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private httpClient: HttpClient, private alertService: AlertService) { }

  HttpGet<T>(url: string): any {

    this.alertService.startProgressBar();

    let httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json');
    
    console.log('url=' + url);

    return this.httpClient.get<T>(url, { headers: httpHeaders })
      .pipe(
        catchError((err) => this.handleError(err)),
        finalize(() => {
          this.alertService.stopProgressBar();
        })
      );
  }

  HttpPost<T>(url: string, data: any): any {

    this.alertService.startProgressBar();
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');

    console.log('url=' + url);

    return this.httpClient.post<T>(url, data, { headers: httpHeaders })
      .pipe(
        catchError((err) => this.handleError(err)),
        finalize(() => {
          this.alertService.stopProgressBar();
        })
      );

  }

  public handleError(error: HttpErrorResponse) {

    console.log('handle error');

    if (error.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }

    return throwError(error);
  }

}
