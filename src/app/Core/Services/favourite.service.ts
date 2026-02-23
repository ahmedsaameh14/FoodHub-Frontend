import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient) { }

  URL = environment.API_URL

  toggleFavourite(itemId: string): Observable<any> {
    return this.http.post(`${this.URL}/registration/favourites/items/${itemId}`, {});
  }

  getFavourites(): Observable<any> {
    return this.http.get(`${this.URL}/registration/favourites/items`);
  }
}
