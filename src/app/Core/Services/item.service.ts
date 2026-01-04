import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { SignService } from './sign.service';
import { environment } from '../../../environment/environment';
import { IItem, IItemRes, IItemsRes } from '../Models/item';
import { Observable } from 'rxjs';

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

  addItem(data : IItem): Observable<IItem>{
    return this._http.post<IItem>(this.URL , data)
  }

  updateItem(id: string , formData: FormData){
    return this._http.put(`${this.URL}${id}`, formData)
  }

  removeItem(id: string){
    return this._http.delete(`${this.URL}${id}`)
  }

}
