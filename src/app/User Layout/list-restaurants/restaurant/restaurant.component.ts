import { Component, OnInit } from '@angular/core';
import { IItem } from '../../../Core/Models/item';
import { ItemService } from '../../../Core/Services/item.service';
import { RestaurantService } from '../../../Core/Services/restaurant.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from "./items/items.component";
import { FavouriteService } from '../../../Core/Services/favourite.service';
import { SignService } from '../../../Core/Services/sign.service';

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
  
  constructor(private _itemS: ItemService ,
     private _restS: RestaurantService ,
      private _route: ActivatedRoute ,
       private _FavS: FavouriteService ,
        private _SignS: SignService ,
          private router: Router){}

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
    })
  }

  selectedItem: IItem | null = null;

openItem(item: IItem) {
  this.selectedItem = item;
}


loadFavourites() {

  if (!this._SignS.isLoggedIn()) return;

  this._FavS.getFavourites().subscribe({
    next: (res) => {
      this.favouriteIds = res.favourites.map((item: any) => item._id);
    },
    error: (err) => console.log(err)
  });

}

  toggleFav(itemId: string) {

  // 🔐 If NOT logged in → redirect
  if (!this._SignS.isLoggedIn()) {
    this.router.navigate(['/login']);
    return;
  }

  // ✅ If logged in → call API
  this._FavS.toggleFavourite(itemId).subscribe({
    next: (res) => {
      this.favouriteIds = res.favourites;
    },
    error: (err) => console.error(err)
  });
}

  isFavourite(itemId: string): boolean {
    return this.favouriteIds.includes(itemId);
  }

}
