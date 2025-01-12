import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import { Program } from '../models/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramServiceService {

  constructor(private http:HttpClient) { }

  public getPrograms(): Observable<Program[]> {
      return this.http.get<Program[]>(environment.backendHost + "/programs");
  }

  public saveProgram(Program: Program): Observable<HttpResponse<string>> {
        return this.http.post<string>(`${environment.backendHost}/programs`, Program, {
          responseType: 'text' as 'json',
          observe: 'response' 
        });
      }
        
  public updateProgram(id: number,Program: Program): Observable<HttpResponse<string>> {
    return this.http.put<string>(`${environment.backendHost}/programs/`+id, Program, {
      responseType: 'text' as 'json',
      observe: 'response' 
    });
  }
    
    
  public getProgram(id: number):Observable<Program>{
    return this.http.get<Program>(environment.backendHost+"/programs/"+id);
  }
    
    
  public deleteProgram(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${environment.backendHost}/programs/`+ id, {
      responseType: 'text' as 'json',
      observe: 'response' 
    });
  }
  
}
