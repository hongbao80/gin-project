import { Component } from '@angular/core';
import {FavoriteChangedEventArgs} from './favorite/favorite.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses = [
    {name:"HB",age:25},
    {name:"Trang",age:21},
    {name:"Vui",age:25},

  ]

  onAdd( ) {
    this.courses.push({name: "Hix", age: 200})
  }

  onRemove(course) {
      let index = this.courses.indexOf(course)
      this.courses.splice(index, 1)
  }
}
