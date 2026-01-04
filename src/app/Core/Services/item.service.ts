import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { SignService } from './sign.service';
import { environment } from '../../../environment/environment';
import { IItemRes, IItemsRes } from '../Models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _http: HttpClient , private _restS: RestaurantService , private _signS: SignService) { }

  URL = environment.API_URL + '/item'

  getItems( restaurantId: string ,page: number = 1 , limit: number = 6){
    return this._http.get<IItemsRes>(`${this.URL}/restaurant/${restaurantId}?page=${page}&limit=${limit}`)
  }

  getItemById(id : string){
    return this._http.get<IItemRes>(this.URL + id)
  }

}
