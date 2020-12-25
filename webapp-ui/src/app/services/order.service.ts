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
    console.log(token)
    let head = new HttpHeaders()
    head = head.append("Authorization", "Bearer " + token)
    let Options = {headers: head}
    return this.http.get(this.url, Options).pipe(map(response => response))
  }
}
