import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Gestion Emploi du temps';
  isAuthenticated!: boolean;
  currentRoute: string = '';  


  constructor(private cookieService: CookieService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects.replace('/', ''); // Extract the current route
      }
    });
  }

  ngOnInit() {
    this.isAuthenticated = this.cookieService.check('username');
  }
}
