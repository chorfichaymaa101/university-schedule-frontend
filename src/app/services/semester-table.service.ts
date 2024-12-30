import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SemesterTable } from 'src/app/models/semester-table.model';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root',
})
export class SemesterTableService {
  
  constructor(private httpClient: HttpClient) {}

  public savesemesterTable(semesterable: SemesterTable): Observable<SemesterTable> {
    return this.httpClient.post<SemesterTable>(`${environment.backendHost}/semestertable`, semesterable);
  }


  public getSemestertableByYear(year: string): Observable<SemesterTable[]> {
    return this.httpClient.get<SemesterTable[]>(`${environment.backendHost}/semestertable/${year}`);
  }
}

