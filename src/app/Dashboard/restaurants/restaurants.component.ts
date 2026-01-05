import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RestaurantService } from '../../Core/Services/restaurant.service';
import { IRestaurant } from '../../Core/Models/restaurant';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants: IRestaurant[] = [];
  page = 1;
  limit = 6;

  constructor(
    private _restaurantService: RestaurantService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this._restaurantService.getRestaurants(this.page, this.limit)
      .subscribe(res => {
        this.restaurants = res.result;
      });
  }

  addRestaurant() {
    this._router.navigate(['/dashboard/addRestaurant/form']);
  }

  editRestaurant(id: string) {
    this._router.navigate(['/dashboard/addRestaurant/form', id]);
  }

  deleteRestaurant(id: string) {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      this._restaurantService.removeRestaurant(id)
        .subscribe(() => this.loadRestaurants());
    }
  }
}
