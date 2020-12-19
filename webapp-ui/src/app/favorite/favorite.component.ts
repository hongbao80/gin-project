import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FavoriteComponent implements OnInit {
  // alias field
  // @Input('is-favorite') isSelected: boolean;
  @Input('isFavorite') isSelected: boolean;

  // alias for output properties
  @Output('change') click = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    console.log("Clicked")
    this.isSelected = !this.isSelected;
    this.click.emit({newValue: this.isSelected});
  }

}

export interface FavoriteChangedEventArgs {
  newValue: boolean
}