import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { IReg } from '../Models/sign';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor( private _http:HttpClient ) { }

  URL = environment.API_URL;

  registration(userdata:IReg): Observable<IReg>{
    return this._http.post<IReg>(`${this.URL}/registration` , userdata)
  }

  
}
