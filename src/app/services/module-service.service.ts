import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import { Module } from '../models/module.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleServiceService {
  url: string  = "/modules";
  constructor(private http:HttpClient) { }
  public getModules(): Observable<Module[]> {
      return this.http.get<Module[]>(environment.backendHost + this.url);
  }

  public saveModule(Module: Module): Observable<HttpResponse<string>> {
          return this.http.post<string>(environment.backendHost + this.url, Module, {
            responseType: 'text' as 'json',
            observe: 'response' 
          });
        }
          
    public updateModule(id: number,Module: Module): Observable<HttpResponse<string>> {
      return this.http.put<string>(environment.backendHost + this.url +id, Module, {
        responseType: 'text' as 'json',
        observe: 'response' 
      });
    }
      
      
    public getModule(id: number):Observable<Module>{
      return this.http.get<Module>(environment.backendHost+this.url+id);
    }
      
      
    public deleteModule(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(environment.backendHost+this.url+ id, {
        responseType: 'text' as 'json',
        observe: 'response' 
      });
    }
}
