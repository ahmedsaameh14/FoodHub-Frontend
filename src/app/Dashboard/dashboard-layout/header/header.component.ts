import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SignService } from '../../../Core/Services/sign.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule , RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 constructor( private _signS: SignService , private _router: Router ){}

    logout(){
    this._signS.logout();
    this._router.navigate(['/home'])
    console.log('You logout');
  }
}
