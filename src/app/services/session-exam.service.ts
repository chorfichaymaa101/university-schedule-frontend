import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionExam } from 'src/app/models/session-exam.model';
import { Person } from 'src/app/models/person.model';
import { Observable } from 'rxjs';
import { Program } from 'src/app/models/program.model';
import {Module} from 'src/app/models/module.model';
import {Class} from 'src/app/models/class.model';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class SessionExamService {


  constructor(private httpClient: HttpClient) { }

    public saveexamTable(sessionExam: SessionExam): Observable<SessionExam> {
        return this.httpClient.post<SessionExam>(`${environment.backendHost}/sessionExam`, sessionExam);
    }
      
    public getSessionExamByExamCalendar(examtableId: number ): Observable<SessionExam[]>{
        return this.httpClient.get<SessionExam[]>(`${environment.backendHost}/sessionExam/${examtableId}`)
      }
    
    //prof
    public getProfById(profId: number ): Observable<Person>{
      return this.httpClient.get<Person>(`${environment.backendHost}/profById/${profId}`)
    }

    public getPersonByProgram(programId: number ): Observable<Person[]>{
      return this.httpClient.get<Person[]>(`${environment.backendHost}/prof/${programId}`)
    }


    //program
    public getProgramById(programId: number ): Observable<Program>{
      return this.httpClient.get<Program>(`${environment.backendHost}/programById/${programId}`)
    }

    public getAllPrograms( ): Observable<Program[]>{
      return this.httpClient.get<Program[]>(`${environment.backendHost}/programs`)
    }

    public getProgramBySemester(semester: string): Observable<Program[]> {
      return this.httpClient.get<Program[]>(`${environment.backendHost}/program/${semester}`);
  }

    //module
    public getModuleById(moduleId: number ): Observable<Module>{
      return this.httpClient.get<Module>(`${environment.backendHost}/moduleById/${moduleId}`)
    }
    public getModuleByProgram(programId: number ): Observable<Module[]>{
      return this.httpClient.get<Module[]>(`${environment.backendHost}/module/${programId}`)
    }

    //classe
    public getClasseById(classId: number ): Observable<Class>{
      return this.httpClient.get<Class>(`${environment.backendHost}/classById/${classId}`)
    }

    public getClassByTypeCapacity(sessiontype: number, capacity: number): Observable<Class[]>{
      return this.httpClient.get<Class[]>(`${environment.backendHost}/class/${sessiontype}/${capacity}`)
    }
  
}
