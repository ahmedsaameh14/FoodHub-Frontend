import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../Core/Services/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './restaurant-form.component.html'
})
export class RestaurantFormComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  restaurantId!: string;
  categories: { _id: string; name: string }[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.form = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      category: ['', Validators.required],
      newCategory: [''],
      // 'image' is handled separately, not FormControl for input type=file
    });

    // Load categories
    this.getCategories();

    // Check if Edit mode
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.restaurantId = id;
      this.getRestaurant();
    }
  }

  // Load categories from backend
  getCategories() {
    this._restaurantService.getCategories()
      .subscribe(res => this.categories = res.data);
  }

  // Load restaurant data for edit
  getRestaurant() {
    this._restaurantService.getRestuarantById(this.restaurantId)
      .subscribe(res => {
        this.form.patchValue({
          name: res.data.name,
          desc: res.data.desc,
          phone: res.data.phone,
          address: res.data.address,
          category: res.data.category
          // image not patched because it's a File input
        });
      });
  }

  // Handle file input change
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  // Add new category
  addCategory() {
    const name = this.form.value.newCategory;
    if (!name) return;

    this._restaurantService.addCategory(name)
      .subscribe(() => {
        this.getCategories();
        this.form.patchValue({ newCategory: '' });
        alert('Category added successfully!');
      });
  }

  // Submit Add/Edit
  submit() {
    if (this.form.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('desc', this.form.get('desc')?.value);
    formData.append('phone', this.form.get('phone')?.value);
    formData.append('address', this.form.get('address')?.value);
    formData.append('category', this.form.get('category')?.value);

    // Append image file if selected
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    if (this.isEditMode) {
      this._restaurantService.updateRestaurant(this.restaurantId, formData)
        .subscribe({
          next: () => {
            alert('Restaurant updated successfully!');
            this.back();
          },
          error: (err) => {
            alert('Failed to update restaurant: ' + err.message);
          }
        });
    } else {
      this._restaurantService.addRestaurant(formData as any)
        .subscribe({
          next: () => {
            alert('Restaurant added successfully!');
            this.back();
          },
          error: (err) => {
            alert('Failed to add restaurant: ' + err.message);
          }
        });
    }
  }

  // Navigate back to restaurants list
  back() {
    this._router.navigate(['/dashboard/restaurants']);
  }
}
