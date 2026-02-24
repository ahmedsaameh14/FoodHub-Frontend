import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IRestaurant } from '../../Core/Models/restaurant';
import { RestaurantService } from '../../Core/Services/restaurant.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants: IRestaurant[] = [];
  contactData = { name: '', email: '', phone: '', message: '' };

  constructor(private _restS: RestaurantService) {}

  ngOnInit() {
    this.getFeaturedRestaurants();
  }

  getFeaturedRestaurants() {
    this._restS.getRestaurants(1, 10).subscribe((res) => {
      this.restaurants = res.result;
    });
  }

  scrollToRestaurants() {
    document.getElementById('restaurants-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  onSubmitContact() {
    console.log('Form Data:', this.contactData);
    alert('Message sent successfully!');
  }
}