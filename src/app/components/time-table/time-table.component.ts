import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { SemesterTable } from 'src/app/models/semester-table.model';
import { SemesterTableService } from 'src/app/services/semester-table.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TimeTableService } from 'src/app/services/time-table.service';
import { TimeTable } from 'src/app/models/time-table.model';

import { SessionService } from 'src/app/services/session.service';
import { Session } from 'src/app/models/session.model';
import { Day } from 'src/app/models/day.model';
import { SessionWithDetails } from 'src/app/models/session-with-details.model';

import { MatSelectModule } from '@angular/material/select';
import { Program } from 'src/app/models//program.model';
import { Person } from 'src/app/models/person.model';
import { Module } from 'src/app/models//module.model';
import { Class } from 'src/app/models//class.model';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';


import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { Time } from 'src/app/models/time.model';
import { SessionType } from 'src/app/models/session-type.model';

import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  standalone: true,
  imports: [
   
    MatGridListModule,
    MatSidenavModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
    MatOptionModule,
    

  ],
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent {

  idTimeTable: number = 0;
  year: string = '';
  programId: number = 0;
  programs: Program[] = [];
  day: string ='';
  time: string ='';
  dataSource: any[] = [];

  timeSlots = ["P1", "P2", "P3", "P4"];
  timeSlotss: { [key: string]: string } = {
  "P1": '8-10',
  "P2": '10-12',
  "P3": '14-16',
  "P4": '16-18'
};


  dayNames: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  times: string[] = ['8-10', '10-12', '14-16', '16-18'];

  @ViewChild(MatTable) table!: MatTable<any>; 
  displayedColumns: string[] = ['day', ...Object.keys(this.timeSlotss)];

  persons: Person[] = [];
  modules: Module[] = [];
  classes: Class[] = [];
  days: string[] = Object.keys(Day).filter(key => isNaN(Number(key)));
  periods: string[] = Object.keys(Time).filter(key => isNaN(Number(key)));
  types: string[] = Object.keys(SessionType).filter(key => isNaN(Number(key)));

  //formulaire
  firstFormGroup = this._formBuilder.group({
    year: ['', Validators.required],
    prog: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({

  });

  thirdFormGroup = this._formBuilder.group({
    prof: ['', Validators.required],
    module: ['', Validators.required],
    time: ['', Validators.required],
    type: ['', Validators.required],
    classe: ['', Validators.required],
    day: ['', Validators.required],
    capacity: ['', Validators.required],
    groupe: ['', Validators.required]

  });
  constructor(
    private _formBuilder: FormBuilder,
    private timeTableService: TimeTableService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    // Charger les programmes depuis le service
    this.timeTableService.getAllPrograms().subscribe(data => {
      this.programs = data;
    });

    this.firstFormGroup.get('prog')?.valueChanges.subscribe(programId => {
      if (programId) {
        const programIdNumber = +programId;
        if (programIdNumber) {
          this.sessionService.getPersonByProgram(programIdNumber).subscribe(data => {
            this.persons = data;
          });
    
          this.sessionService.getModuleByProgram(programIdNumber).subscribe(data => {
            this.modules = data;
          });
        }
      }
    });
    

    const capacityControl = this.thirdFormGroup.get('capacity');
const typeControl = this.thirdFormGroup.get('type');

if (capacityControl && typeControl) {
  combineLatest([
    capacityControl.valueChanges,
    typeControl.valueChanges
  ]).subscribe(([capacity, type]) => {
    console.log('Capacity:', capacity);
    console.log('Type Index:', type);

    if (capacity != null && type != null) {
      const capacityNumber = +capacity;
      const typeNumber = +type;
    
      console.log('Capacity Number:', capacityNumber);
      console.log('Type Number:', typeNumber);
    
      // Fetch classes based on 'capacity' and 'type'
      this.sessionService.getClassByTypeCapacity(typeNumber, capacityNumber).subscribe(data => {
        console.log('Classes:', data);
        this.classes = data; // Update the classes list
      });
    }
    
  });
}

    
  }

  

  timeTableByYearBySemester(programId: number, year: string): void {
    this.timeTableService.checkIfExists(programId, year).subscribe({
      next: (exist: boolean) => {
        if (!exist) {
          const newTimeTable: TimeTable = {
            id: 0,
            academicYear: year,
            programId: programId,
          };
          this.timeTableService.savetimeTable(newTimeTable).subscribe({
            next: (timeTable: TimeTable) => {
              this.idTimeTable = timeTable.id; // Utiliser l'ID généré par le backend
              this.loadSessions(timeTable.id);  // Charger les sessions
            },
            error: (err: HttpErrorResponse) => {
              console.error('Erreur de sauvegarde de l\'emploi du temps:', err);
            }
          });
        } else {
          this.timeTableService.gettimeTableBySemseterYear(programId, year).subscribe({
            next: (timeTable: TimeTable) => {
              this.idTimeTable = timeTable.id;
              this.loadSessions(timeTable.id);  // Charger les sessions
            },
            error: (err: HttpErrorResponse) => {
              console.error('Erreur de récupération de l\'emploi du temps existant:', err);
            }
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur lors de la vérification de l\'emploi du temps:', err);
      }
    });
  }
  
  loadSessions(timeTableId: number): void {
    this.dayNames.forEach((day) => {
      this.timeSlots.forEach((slot) => {
        this.sessionService.getSessionByTimeTableByDayByTime(timeTableId, day, slot).subscribe({
          next: (res: Session) => {
            if (res) {
              this.processSessionExams(res, day, slot);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.error('Erreur de récupération de session:', err);
          }
        });
      });
    });
  }
  


  processSessionExams(session: SessionWithDetails, day: string, slot: string): void {
    console.log('Session reçue:', session);

    if (!session.professorId) {
      console.error('professorId est manquant ou undefined');
      return; // Arrêter le traitement si professorId est manquant
    }

    forkJoin({
      professor: this.sessionService.getProfById(session.professorId),
      module: this.sessionService.getModuleById(session.moduleId),
      classe: this.sessionService.getClasseById(session.classId)
    }).subscribe({
      next: ({ professor, module, classe }) => {
        const sessionWithDetails = {
          ...session,
          professorName: professor?.name || 'Inconnu',
          moduleName: module?.moduleName || 'Inconnu',
          className: classe?.classname || 'Inconnu'
        };

        console.log('Session détaillée:', sessionWithDetails);

        let existingDay = this.dataSource.find(item => item.day === day);
        if (existingDay) {
          existingDay[slot] = sessionWithDetails;
        } else {
          let newRow = { day, [slot]: sessionWithDetails };
          this.dataSource.push(newRow);
        }

        // Tri des données en fonction de l'ordre des jours dans 'dayNames'
        this.dataSource = this.dataSource.sort((a, b) => {
          const indexA = this.dayNames.indexOf(a.day);
          const indexB = this.dayNames.indexOf(b.day);
          return indexA - indexB;
        });

        // Mise à jour de la table
        this.dataSource = [...this.dataSource];
        console.log('DataSource:', this.dataSource);

        //this.table.renderRows(); // Nécessaire pour MatTable
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération des détails:', err);
      }
    });
}


  
  
  onYearSubmit(): void {
    const yearValue = this.firstFormGroup.get('year')?.value?.trim();
    const progValue = Number(this.firstFormGroup.get('prog')?.value) || 0;
    if (yearValue && progValue) {
      this.programId = progValue;
      this.timeTableByYearBySemester(progValue, yearValue);
      console.log('Les données sont bien récupéré');
    } else {
      console.log('Année invalide. Veuillez saisir une année valide.');
    }
  }

 addSessionExamRow(): void {
  const selectedIndex = Number(this.thirdFormGroup.get('type')?.value); // Convertir en nombre

  if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= this.types.length) {
    console.error('Invalid selected index');
    return;
  }
   this.day= this.thirdFormGroup.get('day')?.value?.trim() ?? '';

   this.time= this.thirdFormGroup.get('time')?.value?.trim() ?? '';
    const newRow: Session = {
      id: 0,
      professorId: Number(this.thirdFormGroup.get('prof')?.value) || 0,
      
      moduleId: Number(this.thirdFormGroup.get('module')?.value) || 0,
      day: this.thirdFormGroup.get('day')?.value?.trim() ?? '',

      time: this.thirdFormGroup.get('time')?.value?.trim() ?? '',
      classId: Number(this.thirdFormGroup.get('classe')?.value) || 0,
      
      sessionType: this.types[selectedIndex],
      timetableId: this.idTimeTable,
      capacity: Number(this.thirdFormGroup.get('capacity')?.value),
      groupe: this.thirdFormGroup.get('capacity')?.value?.trim() ?? '',
    };
  
    this.sessionService.savesession(newRow).subscribe({
      next: (res: Session) => {
        console.log('Nouvelle ligne ajoutée :', res);
        //this.dataSource.push(res);
        this.processSessionExams(res, this.day, this.time);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur lors d ajout de la ligne :', err);
      },
    });
  }
}
