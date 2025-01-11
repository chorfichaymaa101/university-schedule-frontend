import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-notifications-student',
  standalone: true,
  imports: [HttpClientModule, CommonModule],  
  templateUrl: './notifications-student.component.html',
  styleUrls: ['./notifications-student.component.css']
})
export class NotificationsStudentComponent implements OnInit{
  requests: any[] = [];

  constructor(private http: HttpClient) {}
  async ngOnInit() {
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
    const student_id = 1; 
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
