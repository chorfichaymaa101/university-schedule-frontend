import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExamTable } from 'src/app/models/exam-table.model';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ExamTableService {



  constructor(private httpClient: HttpClient) {}

  public saveexamTable(examTable: ExamTable): Observable<ExamTable> {
    return this.httpClient.post<ExamTable>(`${environment.backendHost}/examtable`, examTable);
  }

  public getExamTableBySemseterYear(semester: string,year: string ): Observable<ExamTable>{
    return this.httpClient.get<ExamTable>(`${environment.backendHost}/examtable/${semester}/${year}`)
  }

  public checkIfExists(semester: string, year: string) {
    return this.httpClient.get<boolean>(`${environment.backendHost}/countexamTable/${semester}/${year}`)
  }

  public getAllExamTable(): Observable<ExamTable[]> {
    return this.httpClient.get<ExamTable[]>(`${environment.backendHost}/examtable`);
  }

}
