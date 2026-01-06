import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RestaurantService } from '../../Core/Services/restaurant.service';
import { ItemService } from '../../Core/Services/item.service';
import { IRestaurant } from '../../Core/Models/restaurant';
import { IItem } from '../../Core/Models/item';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.component.html'
})
export class ItemsComponent implements OnInit {

  restaurants: IRestaurant[] = [];
  itemsMap: Record<string, IItem[]> = {};
  loading = true;

  constructor(
    private restaurantService: RestaurantService,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants(1, 50).subscribe(res => {
      this.restaurants = res.result;
      this.loading = false;

      this.restaurants.forEach(r => {
        this.loadItems(r._id);
      });
    });
  }

  loadItems(restaurantId: string) {
    this.itemService.getItemsByRestaurant(restaurantId)
      .subscribe(res => {
        this.itemsMap[restaurantId] = res.data;
      });
  }

  addItem(restaurantId: string) {
    this.router.navigate(['/dashboard/items/add', restaurantId]);
  }

  editItem(itemId: string) {
    this.router.navigate(['/dashboard/items/edit', itemId]);
  }

  deleteItem(itemId: string, restaurantId: string) {
    if (!confirm('Delete this item?')) return;

    this.itemService.deleteItem(itemId).subscribe(() => {
      this.loadItems(restaurantId);
    });
  }
}
