import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean; 

  constructor(
    private router: Router, 
    private authService: AuthService) { }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe((result : any) => { 
        console.log("result: ", result.token)
        if (result && result.token) {
          localStorage.setItem('token', result.token)
          this.router.navigate(['/']);
        }
        else  
          this.invalidLogin = true; 
      });
  }
}
