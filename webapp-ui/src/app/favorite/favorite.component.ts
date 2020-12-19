import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  // alias field
  // @Input('is-favorite') isSelected: boolean;
  @Input('isFavorite') isSelected: boolean;

  @Output() change = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    console.log("Clicked")
    this.isSelected = !this.isSelected;
    this.change.emit({newValue: this.isSelected});
  }

}

export interface FavoriteChangedEventArgs {
  newValue: boolean
}