import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notifications-student',
  standalone: true,
  imports: [HttpClientModule, CommonModule],  
  templateUrl: './notifications-student.component.html',
  styleUrls: ['./notifications-student.component.css']
})
export class NotificationsStudentComponent implements OnInit{
  requests: any[] = [];

  
  public username: string = "";
  public userId: number = 0;
  public role: string = "";


  constructor(private cookieService: CookieService,private http: HttpClient, private route: ActivatedRoute, private authService: AuthService ) {}

  async ngOnInit() {

    this.username = this.cookieService.get('username');
    this.userId = +this.cookieService.get('userId'); // Convert to number
    this.role = this.cookieService.get('role');
 
    await this.fetchNotifications();

  }
  
  translateDay(day: string): string {
    const daysInFrench: { [key: string]: string } = {
      Monday: "Lundi",
      Tuesday: "Mardi",
      Wednesday: "Mercredi",
      Thursday: "Jeudi",
      Friday: "Vendredi",
      Saturday: "Samedi",
      Sunday: "Dimanche",
    };
    return daysInFrench[day] || day;
  }

  async fetchNotifications() {
    const student_id = this.userId; 
    const apiUrl = `http://localhost:1000/api/requests/student/${student_id}`;

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (err) => {
        console.error('Error fetching notifications:', err);
      },
    });
  }
}
