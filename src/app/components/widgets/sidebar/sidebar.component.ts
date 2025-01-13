import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  active: number = 0;
  sidebarItems: any[] = [];
  uncheckedNotificationsCount: number = 0; // Store the count here

  
  public username: string = "";
  public userId: number = 0;
  public role: string = "";




  sidebarAdminItems = [
    { link: '', title: 'Home', icon: 'fas fa-home' },
    { link: 'timeTable', title: 'Emploi du temps', icon: 'fas fa-clock' },
    { link: 'semesterTable', title: 'Calendrier de Semestre', icon: 'fas fa-solid fa-calendar-days' },
    { link: 'examTable', title: 'Calendrier des Examens', icon: 'fas fa-regular fa-calendar-check' },
    { link: '/admins', title: 'Administrateurs', icon: 'fa-solid fa-user-tie' },
    { link: '/profs', title: 'Professeurs', icon: 'fa-solid fa-chalkboard-user' },
    { link: '/modules', title: 'Modules', icon: 'fa-solid fa-book' },
    { link: '/classes', title: 'Classes', icon: 'fa-solid fa-school' },
    { link: '/programs', title: 'Fillieres', icon: 'fa-solid fa-bookmark' },
    { link: '/notificationsAdmin', title: 'Notifications', icon: 'fas fa-bell', markAsChecked: true },
    { link: '/historiqueAdmin', title: 'Historique', icon: 'fas fa-history' },
  ];

  sidebarProfessorItems = [
    { link: '', title: 'Home', icon: 'fas fa-home' },
    { link: 'timeTable', title: 'Emploi du temps', icon: 'fas fa-clock' },
    { link: 'semesterTable', title: 'Calendrier de Semestre', icon: 'fas fa-solid fa-calendar-days' },
    { link: 'examTable', title: 'Calendrier des Examens', icon: 'fas fa-regular fa-calendar-check' },
    { link: "/demanderRattrapage",title: "Demande Rattrapage", icon: "fas fa-file-alt" },
    { link: "/changerSeance", title: "Changer séance",icon: "fas fa-exchange-alt" },
    { link: '/notificationsProfesseur', title: 'Notifications', icon: 'fas fa-bell', markAsChecked: true },
  ];

  sidebarStudentItems = [
    { link: '', title: 'Home', icon: 'fas fa-home' },
    { link: 'timeTable', title: 'Emploi du temps', icon: 'fas fa-clock' },
    { link: 'semesterTable', title: 'Calendrier de Semestre', icon: 'fas fa-solid fa-calendar-days' },
    { link: 'examTable', title: 'Calendrier des Examens', icon: 'fas fa-regular fa-calendar-check' },
    { link: '/notificationsEtudiant', title: 'Notifications', icon: 'fas fa-bell', markAsChecked: true },
  ];


 

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router // Inject Router
  ) { }
  
  


  ngOnInit(): void {
    this.username = this.cookieService.get('username');
    this.userId = +this.cookieService.get('userId'); // Convert to number
    this.role = this.cookieService.get('role');
    console.log(this.role);

    this.setSidebarItems(); // Call this method to update the sidebar items based on the role
    this.getUncheckedNotificationsCount();
}


  handleChangeBars(index: number): void {
    this.active = index;
  }



  setSidebarItems(): void {
    if (this.role === 'ADMIN') {
      this.sidebarItems = this.sidebarAdminItems;
    } else if (this.role === 'PROF') {
      this.sidebarItems = this.sidebarProfessorItems;
    } else if (this.role === 'STUDENT') {
      this.sidebarItems = this.sidebarStudentItems;
    } else {
      this.sidebarItems = []; // Default case, if role is not defined
    }
  }


  
  getUncheckedNotificationsCount(): void {
    const user_id = this.userId;
    const apiUrl = `http://localhost:1000/api/requests/notifications/unchecked-count/${user_id}`;
    this.http.get<{ uncheckedCount: number }>(apiUrl).subscribe(
      (response) => {
        if (response.uncheckedCount > 9) {
          this.uncheckedNotificationsCount = +9;  // Show +9 when count is greater than 9
        } else {
          this.uncheckedNotificationsCount = response.uncheckedCount;
        }
      },
      (error) => {
        console.error('Error fetching unchecked notifications count:', error);
      }
    );
  }
  
  markAllAsChecked(): void {
    const user_id = this.userId;
    const apiUrl = `http://localhost:1000/api/requests/notifications/mark-all-checked/${user_id}`;
    this.http.put(apiUrl, {}).subscribe(
      () => {
        this.uncheckedNotificationsCount = 0;  // Reset the count after marking all as checked
      },
      (error) => {
        console.error('Error marking all notifications as checked:', error);
      }
    );
  }
  
  onMenuItemClick(link: string): void {
    // If the clicked item is the Notifications link, mark all as checked
    if (link === '/notificationsAdmin') {
      this.markAllAsChecked();
    }
    if (link === '/notificationsProfesseur') {
      this.markAllAsChecked();
    }
    if (link === '/notificationsEtudiant') {
      this.markAllAsChecked();
    }
    // After marking as checked, navigate to the link
    this.router.navigate([link]);
  }
}