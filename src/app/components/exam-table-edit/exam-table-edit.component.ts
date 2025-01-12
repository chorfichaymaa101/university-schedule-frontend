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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExamTableService } from 'src/app/services/exam-table.service';
import { ExamTable } from 'src/app/models/exam-table.model';
import { SessionExamService } from 'src/app/services/session-exam.service';
import { SessionExam } from 'src/app/models/session-exam.model';
import { SessionExamWithDetails } from 'src/app/models/session-exam-with-details.model';
import {MatSelectModule} from '@angular/material/select';
import { Program } from 'src/app/models//program.model';
import { Person } from 'src/app/models/person.model';
import { Module } from 'src/app/models//module.model';
import { Class } from 'src/app/models//class.model';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import {forkJoin, map} from "rxjs";
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-exam-table-edit',
  standalone: true,
  imports: [
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
    MatOptionModule

  ],
  templateUrl: './exam-table-edit.component.html',
  styleUrls: ['./exam-table-edit.component.css']
})
export class ExamTableEditComponent{
  idExamTable: number = 0;
  year: string = '';
  semester: string = '';
  dataSource: SessionExamWithDetails[] = [];

  programs: Program[] = [];
  persons: Person[] = [];
  modules: Module[] = [];
  classes: Class[] = [];

  selectedRow: any;  // Declare selectedRow property

  displayedColumns: string[] = ['prof', 'program', 'module', 'horaire', 'classe', 'day'];

  firstFormGroup = this._formBuilder.group({
    year: ['', Validators.required],
    semester: ['', Validators.required],
  });

  // Replace your current secondFormGroup initialization with this:
  secondFormGroup = this._formBuilder.group({

  });

// Remove these controls from thirdFormGroup since they're now in secondFormGroup
  thirdFormGroup = this._formBuilder.group({
    prog: [0, Validators.required],
    prof: [0, Validators.required],
    module: [0, Validators.required],
    heureDebut: ['', Validators.required],
    heureFin: ['', Validators.required],
    classe: [0, Validators.required],
    day: ['', Validators.required],
    capacity: ['', Validators.required]
  });




  constructor(
    private _formBuilder: FormBuilder,
    private examTableService: ExamTableService,
    private sessionService: SessionExamService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchPrograms();

    // Update the program change subscription
    this.thirdFormGroup.get('prog')?.valueChanges.subscribe(programId => {
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

    // Update the capacity change subscription
    this.thirdFormGroup.get('capacity')?.valueChanges.subscribe(capacity => {
      if (capacity) {
        const capacityNumber = +capacity;
        if (capacityNumber) {
          this.sessionService.getClassByTypeCapacity(0, capacityNumber).subscribe(data => {
            this.classes = data;
          });
        }
      }
    });
  }

  private fetchPrograms(): void {
    this.sessionService.getAllPrograms().subscribe({
      next: (data) => {
        console.log('Fetched programs:', data); // Log the data
        this.programs = data; // Assign fetched data to the programs array
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to fetch programs:', err); // Handle errors
      },
    });
  }

  examTableByYearBySemester( semester: string, year: string,): void{
    this.examTableService.checkIfExists(semester, year).subscribe({
      next: (exist: boolean) => {
        if(exist == false){
          console.log("Le calendrier d'exam n'existe pas");
        }
        else{
          this.examTableService.getExamTableBySemseterYear(semester, year).subscribe({
            next: (examTable: ExamTable) => {
              this.idExamTable = examTable.id;
              this.sessionService.getSessionExamByExamCalendar(examTable.id).subscribe({
                next: (res: SessionExam[]) => {
                  this.processSessionExams(res);
                },
                error: (err: HttpErrorResponse) => {
                  console.error('Erreur de récupération :', err);
                },
              })
            },
            error: (err: HttpErrorResponse) => {
              console.error('Erreur de récupération :', err);
            },
          });

        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur de récupération :', err);
      },
    });

  }


  processSessionExams(sessionExams: SessionExamWithDetails[]): void {
    const processedData = sessionExams.map((sessionExam) => {
      const sessionExamWithDetails = { ...sessionExam }; // Copie des données initiales

      // Récupération des détails
      this.sessionService.getProfById(sessionExam.professorId).subscribe({
        next: (prof) => (sessionExamWithDetails['professorName'] = prof.name),
        error: (err: HttpErrorResponse) => console.error('Erreur de récupération professeur :', err),
      });

      this.sessionService.getProgramById(sessionExam.programId).subscribe({
        next: (program) => {
          (sessionExamWithDetails['programName'] = program.programName);
        },
        error: (err: HttpErrorResponse) => console.error('Erreur de récupération programme :', err),
      });

      this.sessionService.getModuleById(sessionExam.moduleId).subscribe({
        next: (module) => (sessionExamWithDetails['moduleName'] = module.moduleName),
        error: (err: HttpErrorResponse) => console.error('Erreur de récupération module :', err),
      });

      this.sessionService.getClasseById(sessionExam.classId).subscribe({
        next: (classe) => (sessionExamWithDetails['className'] = classe.classname),
        error: (err: HttpErrorResponse) => console.error('Erreur de récupération classe :', err),
      });

      return sessionExamWithDetails;
    });


    this.dataSource = processedData;
    this.cdr.detectChanges();
  }

  onYearSubmit(): void {
    const yearValue = this.firstFormGroup.get('year')?.value?.trim();
    const semesterValue = this.firstFormGroup.get('semester')?.value?.trim();
    if (yearValue && semesterValue) {
      this.year = yearValue;
      this.semester = semesterValue;
      this.examTableByYearBySemester(semesterValue, yearValue);
      console.log('Les données sont bien récupéré');
    } else {
      console.log('Année invalide. Veuillez saisir une année valide.');
    }
  }


  onRowSelect(row: SessionExamWithDetails): void {
    this.selectedRow = row;

    if(this.selectedRow){
      // First set these values to trigger the dependent dropdowns
      this.thirdFormGroup.patchValue({
        prog: row.programId,        // Use ID since mat-select value is bound to ID
        capacity: row.capacity.toString()
      });

      // Wait for dependent dropdowns to load their data
      this.sessionService.getPersonByProgram(row.programId).subscribe(persons => {
        this.persons = persons;
        // Now set the professor ID
        this.thirdFormGroup.patchValue({
          prof: row.professorId     // Use ID since mat-select value is bound to ID
        });
      });

      this.sessionService.getModuleByProgram(row.programId).subscribe(modules => {
        this.modules = modules;
        // Now set the module ID
        this.thirdFormGroup.patchValue({
          module: row.moduleId      // Use ID since mat-select value is bound to ID
        });
      });

      this.sessionService.getClassByTypeCapacity(0, row.capacity).subscribe(classes => {
        this.classes = classes;
        // Now set the class ID
        this.thirdFormGroup.patchValue({
          classe: row.classId       // Use ID since mat-select value is bound to ID
        });
      });

      // Set the non-dropdown values
      this.thirdFormGroup.patchValue({
        day: row.day,
        heureDebut: row.examPeriodDebut,
        heureFin: row.examPeriodFin
      });

      console.log('Les données sont bien récupéré dans RowSelect');
    }
  }

  updateSessionExamRow(): void {
    const updatedRow: SessionExam = {
      id: this.selectedRow?.id || 0,
      professorId: Number(this.thirdFormGroup.get('prof')?.value) || 0,
      programId: Number(this.thirdFormGroup.get('prog')?.value) || 0,
      moduleId: Number(this.thirdFormGroup.get('module')?.value) || 0,
      examPeriodDebut: this.thirdFormGroup.get('heureDebut')?.value?.trim() ?? '',
      examPeriodFin: this.thirdFormGroup.get('heureFin')?.value?.trim() ?? '',
      classId: Number(this.thirdFormGroup.get('classe')?.value) || 0,
      day: this.formatDateToUTC(this.thirdFormGroup.get('day')?.value ?? ''),
      examCalendarId: this.idExamTable,
      capacity: Number(this.thirdFormGroup.get('capacity')?.value) || 0,
    };

    // Call the update service
    this.sessionService.updateSessionExam(updatedRow).subscribe({
      next: () => {
        console.log('Ligne modifiée');
        this.refreshData();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur lors de la modification de la ligne :', err);
      },
    });

  }


  refreshData(): void {
    if (this.semester && this.year) {
      this.examTableByYearBySemester(this.semester, this.year);
    }
  }

  formatDateToUTC(date: any): string {
    const localDate = new Date(date);
    const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
    return utcDate.toISOString().split('T')[0];

  }

}
