import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import { PageClasse } from '../models/page.models';
import { Class } from '../models/class.model';


@Injectable({
  providedIn: 'root'
})
export class ClassServiceService {
  url: string  = "/classes";
  constructor(private http:HttpClient) { }
  public getClasses(): Observable<Class[]> {
      return this.http.get<Class[]>(environment.backendHost + this.url);
  }

  public saveClass(Class: Class): Observable<HttpResponse<string>> {
          return this.http.post<string>(environment.backendHost + this.url, Class, {
            responseType: 'text' as 'json',
            observe: 'response' 
          });
        }
          
    public updateClass(id: number,Class: Class): Observable<HttpResponse<string>> {
      return this.http.put<string>(environment.backendHost + this.url +id, Class, {
        responseType: 'text' as 'json',
        observe: 'response' 
      });
    }
      
      
    public getClass(id: number):Observable<Class>{
      return this.http.get<Class>(environment.backendHost+this.url+id);
    }
      
      
    public deleteClass(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(environment.backendHost+this.url+ id, {
        responseType: 'text' as 'json',
        observe: 'response' 
      });
    }
}
