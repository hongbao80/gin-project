import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService : AuthService
  ) { }

  // Check if current user is admin, go on.
  // else access denied
  canActivate() {
    let currentUser = this.authService.currentUser
    if (currentUser && currentUser.admin) return true
    this.router.navigate(['/no-access'])
    return false
  }
}
