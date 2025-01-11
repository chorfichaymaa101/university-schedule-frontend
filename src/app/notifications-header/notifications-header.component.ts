import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-header',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Standalone component imports
  templateUrl: './notifications-header.component.html',
  styleUrls: ['./notifications-header.component.css']
})
export class NotificationsHeaderComponent implements OnInit {
  uncheckedNotificationsCount: number = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getUncheckedNotificationsCount();
  }

  getUncheckedNotificationsCount(): void {
    const user_id = 3;
    const apiUrl = `http://localhost:1000/api/requests/notifications/unchecked-count/${user_id}`;
    this.http.get<{ uncheckedCount: number }>(apiUrl).subscribe(
      (response) => {
        this.uncheckedNotificationsCount = response.uncheckedCount;
      },
      (error) => {
        console.error('Error fetching unchecked notifications count:', error);
      }
    );
  }

  markAllAsChecked(): void {
    const user_id = 3;
    const apiUrl = `http://localhost:1000/api/requests/notifications/mark-all-checked/${user_id}`;
    this.http.put(apiUrl, {}).subscribe(
      () => {
        this.uncheckedNotificationsCount = 0;
      },
      (error) => {
        console.error('Error marking all notifications as checked:', error);
      }
    );
  }
}
