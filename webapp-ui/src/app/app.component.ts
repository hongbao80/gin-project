import { Component } from '@angular/core';
import {FavoriteChangedEventArgs} from './favorite/favorite.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HBTeamobi'; 
  post = {
    title: "Title",
    isFavorite: false 
  };

  onFavoriteChanged(eventArgs : FavoriteChangedEventArgs) {
    console.log("Favorite changed", eventArgs)
  }
}
