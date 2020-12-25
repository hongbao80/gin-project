import { environment } from './../../environments/environment.prod';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  helloColor = environment.helloColor
  constructor(public authService: AuthService) { }
}
