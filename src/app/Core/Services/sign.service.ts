import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ILogin, ILoginRes, IReg, IUser } from '../Models/sign';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor( private _http:HttpClient ) {
    this.autoLogin();
   }

  URL = environment.API_URL;
  TOKEN_KEY = 'token';

  // For Rgeistration
  registration(userdata:IReg): Observable<IReg>{
    return this._http.post<IReg>(`${this.URL}/registration` , userdata)
  }

  // For Login
  private myUser:BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public user$ = this.myUser.asObservable();

  // Get data from Token
  decode(token:string){
    return jwtDecode<IUser>(token);
  }

  setToken(token:string){
    localStorage.setItem(this.TOKEN_KEY , token)
    console.log(this.decode(token));
  }

  getRole():string | null{
    const token = localStorage.getItem(this.TOKEN_KEY);
    if(token){
      return this.decode(token).role
    }
    return null
  }

  getName():string | null{
    const token = localStorage.getItem(this.TOKEN_KEY);
    if(token){
      return this.decode(token).name
    }
    return null
  }

  getToken(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  login(data:ILogin): Observable<ILoginRes>{
    return this._http.post<ILoginRes>(`${this.URL}/login` , data).pipe(tap((res)=>{
      this.setToken(res.token);
      this.myUser.next(this.decode(res.token));
    }))
  }

  logout(){
    localStorage.removeItem(this.TOKEN_KEY);
    console.log('You Logout');
    this.myUser.next(null);
  }

  autoLogin(){
    const token = this.getToken();
    if(token){
      try{
        const decodedUser = this.decode(token);
        this.myUser.next(decodedUser);
      }catch(error){
        this.logout();
      }
    }
  }

  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

  // Get All Users (Admin Only)
getAllUsers(): Observable<{ message: string; data: IReg[] }> {
  return this._http.get<{ message: string; data: IReg[] }>(
    `${this.URL}/registration`
  );
}

// Delete User
deleteUser(id: string) {
  return this._http.delete(`${this.URL}/registration/${id}`);
}

createAdmin(data: IReg) {
  return this._http.post(
    `${this.URL}/registration/createAdmin`,
    data
  );
}

}

