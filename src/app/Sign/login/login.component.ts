import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignService } from '../../Core/Services/sign.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor( private _sign:SignService , private _router:Router , private _activatedRouter: ActivatedRoute){}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl ('' , [Validators.required , Validators.email]),
    password: new FormControl ('' , [Validators.required , Validators.minLength(6)]),
  });

  login(){
    this._sign.login(this.loginForm.value).subscribe({
      next: ()=>{
        const returnedRouter = this._activatedRouter.snapshot.queryParamMap.get('returnurl');     // if i go to point that is should login it send me to login and after login i back to the same point
        const isAdmin = returnedRouter?.startsWith('/dashboard');
        const isUser = returnedRouter?.startsWith('');

        // USER
        if(this._sign.getRole()=== 'user' && this._sign.getToken()){
          if(returnedRouter && isUser){
            this._router.navigateByUrl(returnedRouter)
          }else{
            this._router.navigate(['/home'])
          }
        } 
        
        // ADMIN
        else if(this._sign.getRole() === 'admin' && this._sign.getToken()){
          if(returnedRouter && isAdmin){
            this._router.navigateByUrl(returnedRouter)
          }else{
            this._router.navigate(['/dashboard'])
          }
        }
        console.log('Login OK');
      },
      error: (err)=>{console.log(err.message);
      }
    })
  }
}
