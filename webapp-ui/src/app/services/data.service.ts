import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url:string, private http: HttpClient) {

  }

  getAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json'
      })
    };
    return this.http.get(this.url, httpOptions).pipe(map(response => {
      console.log("response", response)
      return response
    })).pipe(catchError(this.handleError))
  }

  create(resource) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json'
      })
    };
    return this.http.post(this.url, JSON.stringify(resource), httpOptions)
        .pipe(map(response => {
          console.log("response", response)
          return response
        }))
        .pipe(catchError(this.handleError))
  }

  update(resource) {
    return this.http.put(this.url+"/"+resource.id, JSON.stringify(resource))
    .pipe(map(response => response)) 
    .pipe(catchError(this.handleError))
  }

  delete(id) {
    return this.http.delete(this.url+"/"+id)
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.status == 404) {
      return throwError(new NotFoundError(error))
    } else if (error.status == 400) {
      return throwError(new BadInputError(error))
    }
    return throwError(new AppError(error))
  }
}
