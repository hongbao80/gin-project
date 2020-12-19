import { Component } from '@angular/core';
import {FavoriteChangedEventArgs} from './favorite/favorite.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses = [1, 2]

  anyCourses() {
    return this.courses.length > 0
  }
}
