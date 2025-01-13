import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  


import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notifications-prof',
  standalone: true,
  imports: [HttpClientModule, CommonModule],  
  templateUrl: './notifications-prof.component.html',
  styleUrls: ['./notifications-prof.component.css'],
})

export class NotificationsProfComponent implements OnInit {
  requests: any[] = [];

  public username: string = "";
  public userId: number = 0;
  public role: string = "";

  constructor(private cookieService: CookieService,private http: HttpClient, private route: ActivatedRoute, private authService: AuthService ) {}

  async ngOnInit() {

    
    this.username = this.cookieService.get('username');
    this.userId = +this.cookieService.get('userId'); // Convert to number
    this.role = this.cookieService.get('role');

    console.log(this.cookieService.get('userId'));

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
  
  getStatusIcon(status: string): string {
    return {
      Approved: "icon-approved",
      Pending: "icon-pending",
      Refused: "icon-refused",
    }[status] || "icon-default";
  }

  getHeaderIcon(oldDay: string): string {
    return oldDay ? "fa fa-calendar-alt header-icon" : "fa fa-clock header-icon";
  }
  
  getCardClass(status: string): string {
    return {
      Approved: "card-approved",
      Pending: "card-pending",
      Refused: "card-refused",
    }[status] || "card-default";
  }
  translateStatus(status: string): string {
    return {
      Approved: "Approuvé",
      Pending: "En attente",
      Refused: "Refusé",
    }[status] || "Inconnu";
  }
    
  async fetchNotifications() {
    const professorId = this.userId; 
    const apiUrl = `http://localhost:1000/api/requests/professor/${professorId}`;

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
