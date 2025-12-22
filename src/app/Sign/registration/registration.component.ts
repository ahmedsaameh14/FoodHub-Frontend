import { Component } from '@angular/core';
import { SignService } from '../../Core/Services/sign.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule , CommonModule , RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private _sign:SignService , private _router:Router){}

  regForm: FormGroup = new FormGroup({
    name: new FormControl('' , [Validators.required]),
    email: new FormControl('' , [Validators.required , Validators.email]),
    password: new FormControl('' , [Validators.required , Validators.minLength(6)])
  });

  onSubmit(){
    if(this.regForm.invalid){
      this.regForm.markAllAsTouched();
      return;
    }

    this._sign.registration(this.regForm.value).subscribe({
      next: (res) =>{
        console.log('Registration Successful' , res);
        this._router.navigate(['/login'])
      },
      error: (err) => console.log('Registration Failed' , err),
    })
  }
}
