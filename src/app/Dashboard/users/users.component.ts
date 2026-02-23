import { Component, OnInit } from '@angular/core';
import { IReg } from '../../Core/Models/sign';
import { SignService } from '../../Core/Services/sign.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: IReg[] = [];

  constructor(private _sign: SignService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this._sign.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteUser(id: string | undefined) {
    if (!id) return;

    if (confirm('Are you sure you want to delete this user?')) {
      this._sign.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers(); // refresh list
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}

