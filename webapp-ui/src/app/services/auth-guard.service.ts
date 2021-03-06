import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  // Check if is loginned, return true, it means no navigate to login page
  // Else navigate to login page
  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) return true
    console.log('is not login', state)
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false
  }
}
