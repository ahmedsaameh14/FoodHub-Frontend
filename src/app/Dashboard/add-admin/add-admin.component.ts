import { Component } from '@angular/core';
import { SignService } from '../../Core/Services/sign.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-admin',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  
  adminForm: FormGroup;
  message = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private signService: SignService
  ) {
    this.adminForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  createAdmin() {
    if (this.adminForm.invalid) {
      this.adminForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.signService.createAdmin(this.adminForm.value).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.adminForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.message = err.error?.message || 'Something went wrong';
        this.isSubmitting = false;
      }
    });
  }

  // Shortcut getter for template
  get f() {
    return this.adminForm.controls;
  }
}

