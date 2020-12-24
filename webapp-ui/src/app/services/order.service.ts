import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {
  url ="http://localhost:8080/api/orders"
  constructor(private http: HttpClient) {
  }

  getOrders() {
    let token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'Bearer':  token
      })
    };
    return this.http.get(this.url, httpOptions).pipe(map(response => response))
  }
}
