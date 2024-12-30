import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  active: number = 0;
  sidebarItems: any[] = [];

  sidebarAdminItems = [
    {
      link: '',
      title: 'Home',
      icon: 'fas fa-home'
    },
    {
      link: 'timeTable',
      title: 'Emploi du temps',
      icon: 'fas fa-clock'
    },
    {
      link: 'semesterTable',
      title: 'Calendrier de Semestre',
      icon: 'fas fa-solid fa-calendar-days'
    },
    {
      link: 'examTable',
      title: 'Calendrier des Examens',
      icon: 'fas fa-regular fa-calendar-check'
    }
  ];

  constructor() {}

  handleChangeBars(index: number): void {
    this.active = index;
  }

  ngOnInit(): void {
    this.sidebarItems = this.sidebarAdminItems;
  }
}