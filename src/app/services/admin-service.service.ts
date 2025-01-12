import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admins } from '../models/admins.models';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import { PageAdmin } from '../models/page.models';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http:HttpClient) { }

  
    public getAdmins(): Observable<Admins[]> {
      return this.http.get<Admins[]>(environment.backendHost + "/admins");
    }
   
    public saveAdmin(Admins: Admins): Observable<HttpResponse<string>> {
      return this.http.post<string>(`${environment.backendHost}/admins`, Admins, {
        responseType: 'text' as 'json',
        observe: 'response' 
      });
    }
  
  
      public updateAdmin(id: number,Admins: Admins): Observable<HttpResponse<string>> {
        return this.http.put<string>(`${environment.backendHost}/admins/`+id, Admins, {
          responseType: 'text' as 'json',
          observe: 'response' 
        });
      }
  
  
    public getAdmin(id: number):Observable<Admins>{
      return this.http.get<Admins>(environment.backendHost+"/admins/"+id);
    }
  
  
    public deleteAdmin(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(`${environment.backendHost}/admins/`+ id, {
        responseType: 'text' as 'json',
        observe: 'response' 
      });
    }
  
}
