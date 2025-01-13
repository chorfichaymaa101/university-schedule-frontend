import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule

import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

interface Class {
  id: number;
  classname: string;
}

@Component({
  selector: 'app-notifications-admin',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './notifications-admin.component.html',
  styleUrls: ['./notifications-admin.component.css']
})
export class NotificationsAdminComponent implements OnInit {
  requests: any[] = [];
  showRefuseModal: boolean = false;
  showAcceptModal: boolean = false; // New flag to show the accept modal
  selectedRequestId: number | null = null;
  selectedClassId: number | null = null; // Variable to store classId for accepted request

  classes: Class[] = [];  // Initialize to an empty array

  
  public username: string = "";
  public userId: number = 0;
  public role: string = "";

  constructor(private cookieService: CookieService,private http: HttpClient, private route: ActivatedRoute, private authService: AuthService ) {}

  ngOnInit(): void {
    this.fetchNotifications();
    this.fetchClasses(); 


    
    this.username = this.cookieService.get('username');
    this.userId = +this.cookieService.get('userId'); // Convert to number
    this.role = this.cookieService.get('role');
 
  }

  fetchNotifications() {
    const apiUrl = `http://localhost:1000/api/requests/admin`;

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (err) => {
        console.error('Error fetching notifications:', err);
      }
    });
  }

  async fetchClasses() {
    try {
      const apiUrl = 'http://localhost:1000/api/classes';
      const classes = await this.http.get<Class[]>(apiUrl).toPromise(); // Convert observable to promise
      this.classes = classes || [];  // Ensure modules is always an array, even if undefined or null is returned
      console.log('Classes fetched:', classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  }
  // Opens the refuse modal and sets the selected request ID
  openRefuseModal(requestId: number) {
    this.selectedRequestId = requestId;
    this.showRefuseModal = true;
  }

  closeRefuseModal() {
    this.showRefuseModal = false;
    this.selectedRequestId = null;
  }

  openAcceptModal(requestId: number, classId: number) {
    this.selectedRequestId = requestId;
    this.selectedClassId = classId;
    this.showAcceptModal = true;
    this.selectedClassId = null; // Reset the class ID
  }

  // Close Accept Modal
  closeAcceptModal() {
    this.showAcceptModal = false;
    this.selectedRequestId = null;
    this.selectedClassId = null;
  }

  closeAcceptModal2() {
    this.showAcceptModal = false;
    this.selectedRequestId = null;
    this.selectedClassId = null;
  }
  // Submit Accept Request
  submitAcceptedRequest() {
    if (this.selectedRequestId !== null && this.selectedClassId !== null) {
        const apiUrl = `http://localhost:1000/api/requests/${this.selectedRequestId}/status`;
        const body = { 
            classId: this.selectedClassId, 
            status: 'Approved'
        };

        this.http.put(apiUrl, body).subscribe({
            next: () => {
                console.log('Request accepted successfully');
                this.fetchNotifications(); // Refresh the list
                this.closeAcceptModal(); // Close modal
            },
            error: (err) => console.error('Error accepting request:', err)
        });
    } else {
        console.error('Request ID or Class ID is missing');
    }
}


  
  submitAcceptedRequest2() {
    if (this.selectedRequestId !== null) {
      const apiUrl = `http://localhost:1000/api/requests/${this.selectedRequestId}/status`;
      const body = { 
        status: 'Approved' // Include the status field
      };
  
      this.http.put(apiUrl, body).subscribe({
        next: () => {
          console.log('Request accepted successfully');
          this.fetchNotifications(); // Refresh the list
          this.closeAcceptModal2(); // Close modal
        },
        error: (err) => console.error('Error accepting request:', err)
      });
    } else {
      console.error('Request ID or Class ID is missing');
    }
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
  
  // Confirms the refusal and sends the update to the backend
  confirmRefuseRequest() {
    if (this.selectedRequestId !== null) {
      const apiUrl = `http://localhost:1000/api/requests/${this.selectedRequestId}/status`;
      const body = { status: 'Refused' };

      this.http.put(apiUrl, body).subscribe({
        next: () => {
          console.log('Request status updated to Refused');
          this.fetchNotifications(); // Refresh notifications list
          this.closeRefuseModal(); // Close the modal
        },
        error: (err) => {
          console.error('Error updating status:', err);
        }
      });
    }
  }
}
