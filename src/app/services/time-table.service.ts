import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeTable } from 'src/app/models/time-table.model';
import { Program } from 'src/app/models/program.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {

  

  constructor(private httpClient: HttpClient ) { }

  public savetimeTable(timeTable: TimeTable): Observable<TimeTable> {
      return this.httpClient.post<TimeTable>(`${environment.backendHost}/timeTable`, timeTable);
  }

  public gettimeTableBySemseterYear(programId: number, academicYear: string): Observable<TimeTable> {
    return this.httpClient.get<TimeTable>(`${environment.backendHost}/timetable/${programId}/${academicYear}`);
  }

  
  public checkIfExists(programId: number, academicYear: string) {
    return this.httpClient.get<boolean>(`${environment.backendHost}/counttimeTable/${programId}/${academicYear}`)
  }

  public getAllPrograms( ): Observable<Program[]>{
        return this.httpClient.get<Program[]>(`${environment.backendHost}/programs`)
      }
}
