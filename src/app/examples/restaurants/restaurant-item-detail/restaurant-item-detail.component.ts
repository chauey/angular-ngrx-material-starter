import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '@app/examples/restaurants/restaurants.model';

@Component({
  selector: 'anms-restaurant-item-detail',
  templateUrl: './restaurant-item-detail.component.html',
  styleUrls: ['./restaurant-item-detail.component.scss']
})
export class RestaurantItemDetailComponent implements OnInit {
  @Input() restaurant: Restaurant;

  constructor() {}

  ngOnInit() {}
}
