import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../../Core/Services/item.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  itemId!: string;
  restaurantId!: string;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required]
    });

    const itemId = this.route.snapshot.paramMap.get('itemId');
    const restId = this.route.snapshot.paramMap.get('restaurantId');

    if (itemId) {
      this.isEditMode = true;
      this.itemId = itemId;
      this.loadItem();
    }

    if (restId) {
      this.restaurantId = restId;
    }
  }

  loadItem() {
    this.itemService.getItemById(this.itemId)
      .subscribe(res => {
        const item = res.data;
        this.form.patchValue({
          name: item.name,
          desc: item.desc,
          price: item.price
        });
        this.restaurantId = item.restuarantId;
      });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

submit() {
  if (this.form.invalid) return;

  const fd = new FormData();
  fd.append('name', this.form.get('name')?.value);
  fd.append('desc', this.form.get('desc')?.value);
  fd.append('price', this.form.get('price')?.value);
  fd.append('restaurantId', this.restaurantId);

  if (this.selectedFile) {
    fd.append('img', this.selectedFile);
  }

  if (this.isEditMode) {
    this.itemService.updateItem(this.itemId, fd).subscribe({
      next: () => {
        alert('Item updated successfully!');
        this.back();
      },
      error: err => alert(err.error?.message || 'Update failed')
    });
  } else {
    this.itemService.createItem(fd).subscribe({
      next: () => {
        alert('Item added successfully!');
        this.back();
      },
      error: err => alert(err.error?.message || 'Add failed')
    });
  }
}


  back() {
    this.router.navigate(['/dashboard/items']);
  }
}
