import { Component, OnInit } from '@angular/core';
import { IItem } from '../../../Core/Models/item';
import { ItemService } from '../../../Core/Services/item.service';
import { RestaurantService } from '../../../Core/Services/restaurant.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant',
  imports: [CommonModule , RouterLink],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent implements OnInit {
  items: IItem[] = [];
  currentPage = 1;
  totalPages = 1;
  restaurantId !: string
  
  constructor(private _itemS: ItemService , private _restS: RestaurantService , private _route: ActivatedRoute){}

  ngOnInit(){
    this.getItems()
  }

  getItems(page: number=1){
    this.restaurantId = this._route.snapshot.paramMap.get('id')!;
    this._itemS.getItemsByRestaurant(this.restaurantId).subscribe((res) =>{
      this.items = res.data;
      this.currentPage = res.page;
      this.totalPages = res.totalPages;
      console.log(this.items)
    })
  }

}
