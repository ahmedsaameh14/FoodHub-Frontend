import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignService } from './sign.service';
import { environment } from '../../../environment/environment';
import { IRestaurant, IRestaurantRelatedRes, IRestaurantRes, IRestaurantsRes } from '../Models/restaurant';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private _http:HttpClient , private _sign:SignService) {}

  URL = environment.API_URL + '/restaurant';
  categoryURL = environment.API_URL + '/category'

  getRestaurants(page: number = 1 , limit: number = 6){
    return this._http.get<IRestaurantsRes>(`${this.URL}?page=${page}?limit=${limit}`);
  }

  getRestuarantById(id: string){
    return this._http.get<IRestaurantRes>(this.URL + id)
  }

  getRelatedRestaurants(id: string){
    return this._http.get<IRestaurantRelatedRes>(this.URL + '/related' + id)
  }

  addRestaurant(data:IRestaurant): Observable<IRestaurant>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this._http.post<IRestaurant>(this.URL , data , {headers})
  }

  updateRestaurant(id: string , formData: FormData){
    return this._http.put(`${this.URL}${id}` , formData);
  }

  getCategories(): Observable<{ message: string; data: { _id: string, name: string }[] }> {
    return this._http.get<{ message: string; data: { _id: string, name: string }[] }>(this.categoryURL);
  }

  addCategory(name: String){
    return this._http.post(this.categoryURL , {name});
  }
}
