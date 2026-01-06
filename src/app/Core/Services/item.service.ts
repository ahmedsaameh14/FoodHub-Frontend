import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { IItem, IItemsRes, IItemRes } from '../Models/item';

@Injectable({ providedIn: 'root' })
export class ItemService {

  private URL = environment.API_URL + '/item';

  constructor(private http: HttpClient) {}

  createItem(data: FormData):Observable<IItem> {
    return this.http.post<IItem>(this.URL , data);
  }

  
  getItemsByRestaurant(restaurantId: string): Observable<IItemsRes> {
    return this.http.get<IItemsRes>(`${this.URL}/restaurant/${restaurantId}`);
  }

  getItemById(id: string): Observable<IItemRes> {
    return this.http.get<IItemRes>(`${this.URL}/${id}`);
  }

  updateItem(id: string, data: FormData) {
    return this.http.put(`${this.URL}/${id}`, data);
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
