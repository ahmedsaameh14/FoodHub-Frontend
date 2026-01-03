import { Component, OnInit } from '@angular/core';
import { IRestaurant } from '../../Core/Models/restaurant';
import { RestaurantService } from '../../Core/Services/restaurant.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-restaurants',
  imports: [ CommonModule , RouterLink],
  templateUrl: './list-restaurants.component.html',
  styleUrl: './list-restaurants.component.css'
})
export class ListRestaurantsComponent implements OnInit{
  restaurants : IRestaurant[] = []
  currentPage = 1;
  totalPages = 1;

  constructor(private _restS:RestaurantService){}

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants( page :number = 1){
    this._restS.getRestaurants(page).subscribe( (res) =>{
      this.restaurants = res.result;
      this.currentPage = res.page;
      this.totalPages = res.totalPages;
    })
  }

  goToPage(page: number){
    if (page < 1 || page > this.totalPages) return ;
    this.getRestaurants(page)
  }
}
