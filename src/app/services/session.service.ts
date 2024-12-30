import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from 'src/app/models/session.model';
import { Person } from 'src/app/models/person.model';
import { Observable } from 'rxjs';
import { Program } from 'src/app/models/program.model';
import {Module} from 'src/app/models/module.model';
import {Class} from 'src/app/models/class.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private api = 'http://localhost:8088';
  constructor(private httpClient: HttpClient) { }


  public savesession(session: Session): Observable<Session> {
          return this.httpClient.post<Session>(`${environment.backendHost}/session`, session);
      }
        
  public getSessionByTimeTableByDayByTime(timetableId: number , day: string, time: string): Observable<Session>{
          return this.httpClient.get<Session>(`${environment.backendHost}/session/${timetableId}/${day}/${time}`)
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
