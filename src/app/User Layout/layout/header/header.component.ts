import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../../../Core/Models/sign';
import { SignService } from '../../../Core/Services/sign.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user$: Observable<IUser | any>;
  constructor(private _sign: SignService, private _router: Router) {
    this.user$ = this._sign.user$;
  }

  logout() {
    this._sign.logout();
    this._router.navigate(['/home']);
  }
}
