import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../../../../Core/Models/item';

@Component({
  selector: 'app-items',
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  @Input() item!: IItem;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
