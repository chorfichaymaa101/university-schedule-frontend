import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profs } from '../models/profs.models';
import {environment} from "../../environments/environment";
import { PageProf } from '../models/page.models';

@Injectable({
  providedIn: 'root'
})
export class ProfServiceService {

  constructor(private http:HttpClient) { }

  public getProfs(page: number, size: number): Observable<PageProf> {
    return this.http.get<PageProf>(environment.backendHost + "/professors?page=" + page + "&size=" + size);
  }
  public searchProfs(keyword : string,page: number, size: number):Observable<PageProf>{
    return this.http.get<PageProf>(environment.backendHost+"/professors/search?keyword="+keyword+"&page=" + page + "&size=" + size)
  }
  public saveProf(Profs: Profs): Observable<HttpResponse<string>> {
    return this.http.post<string>(`${environment.backendHost}/professors`, Profs, {
      responseType: 'text' as 'json',
      observe: 'response' 
    });
  }

  
  /*public updateProf(id: number,Prof: Profs):Observable<Profs>{
    return this.http.put<Profs>(environment.backendHost+"/professors/"+id,Prof);
  }*/

    public updateProf(id: number,Profs: Profs): Observable<HttpResponse<string>> {
      return this.http.put<string>(`${environment.backendHost}/professors/`+id, Profs, {
        responseType: 'text' as 'json',
        observe: 'response' 
      });
    }


  public getProf(id: number):Observable<Profs>{
    return this.http.get<Profs>(environment.backendHost+"/professors/"+id);
  }


  public deleteProf(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(`${environment.backendHost}/professors/`+ id, {
      responseType: 'text' as 'json',
      observe: 'response' 
    });
  }
}
