import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable()
export class AuthService {
  url = "http://localhost:8080/api/authenticate"
  constructor(private http: HttpClient) {
  }

  login(credentials) { 
   return this.http.post(this.url, 
      JSON.stringify(credentials));
  }

  logout() { 
    localStorage.removeItem('token')
  }

  isLoggedIn() { 
    let jwtHelper = new JwtHelperService()
    let token = localStorage.getItem('token')
    if (!token ) {
      return false
    }
    let expirationDate = jwtHelper.getTokenExpirationDate(token)
    let isExpired = jwtHelper.isTokenExpired(token)
    console.log("Expiration: ", expirationDate)
    console.log("isExpired", isExpired)
    return !isExpired;
  }

  get currentUser() {
    let token = localStorage.getItem('token')
    if (!token) {
      return null
    }
    return new JwtHelperService().decodeToken(token)
  }
}

