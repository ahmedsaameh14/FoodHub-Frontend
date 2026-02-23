import { Component, OnInit } from '@angular/core';
import { IItem } from '../../../Core/Models/item';
import { ItemService } from '../../../Core/Services/item.service';
import { RestaurantService } from '../../../Core/Services/restaurant.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from "./items/items.component";
import { FavouriteService } from '../../../Core/Services/favourite.service';

@Component({
  selector: 'app-restaurant',
  imports: [CommonModule , ItemsComponent],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css',
})
export class RestaurantComponent implements OnInit {
  items: IItem[] = [];
  currentPage = 1;
  totalPages = 1;
  restaurantId !: string
  favouriteIds: string[] = [];
item: any;
  
  constructor(private _itemS: ItemService , private _restS: RestaurantService , private _route: ActivatedRoute , private _FavS: FavouriteService){}

  ngOnInit(){
    this.getItems()
    this.loadFavourites();
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

  selectedItem: IItem | null = null;

openItem(item: IItem) {
  this.selectedItem = item;
}


loadFavourites() {
    this._FavS.getFavourites().subscribe(res => {
      this.favouriteIds = res.favourites.map((item: any) => item._id);
    });
  }

  toggleFav(itemId: string) {
    this._FavS.toggleFavourite(itemId).subscribe(() => {
      if (this.favouriteIds.includes(itemId)) {
        this.favouriteIds = this.favouriteIds.filter(id => id !== itemId);
      } else {
        this.favouriteIds.push(itemId);
      }
    });
  }

  isFavourite(itemId: string): boolean {
    return this.favouriteIds.includes(itemId);
  }

}
