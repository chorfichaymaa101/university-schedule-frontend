import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student.models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean = false;
  public isAdmin: boolean = false;
  public isProf: boolean = false;
  public name: string = "";
  public token: string = "";
  public id: number = 0;

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(environment.backendHost +'/auth/login', loginData);
  }

  SignUp(Student: Student): Observable<HttpResponse<string>> {
    return this.http.post<string>(environment.backendHost +'/students', Student,  {
      responseType: 'text' as 'json',
      observe: 'response' 
    });
  }
  
  authenticateWithGoogle(idToken: string): Observable<any> {
    return this.http.post(environment.backendHost +'/google', { idToken });
  }

  logout(id:number): Observable<boolean> {
    // remove cookies
    this.cookieService.delete('username');
    this.cookieService.delete('userId');
    // Remove more cookies if needed
    localStorage.removeItem('token');
   // return Observable<true>;
    return this.http.post<boolean>(environment.backendHost +'/logout',{}, 
      { withCredentials: false })
    }

}
