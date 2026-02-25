import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignService } from '../../Core/Services/sign.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  regForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private _sign: SignService, private _router: Router) {}

  onSubmit() {
    if (this.regForm.invalid) {
      this.regForm.markAllAsTouched();
      return;
    }

    this._sign.registration(this.regForm.value).subscribe({
      next: (res) => {
        console.log('Success:', res);
        this._router.navigate(['/login']);
      },
      error: (err) => console.error('Registration error:', err)
    });
  }
}