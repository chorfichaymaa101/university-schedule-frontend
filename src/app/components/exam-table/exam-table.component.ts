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
import { Router } from '@angular/router';
@Component({
  selector: 'app-exam-table',
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
  templateUrl: './exam-table.component.html',
  styleUrls: ['./exam-table.component.css'],
})
export class ExamTableComponent {
  navigateToEditPage(): void {
    this.router.navigate(['/exam-table-edit']);
  }
deleteTable() {
throw new Error('Method not implemented.');
}

  idExamTable: number = 0;
  year: string = '';
  semester: string = '';
  dataSource: SessionExamWithDetails[] = [];
  stepperVisible=false
  selectedYear: string | null = null;
  selectedSemester: string | null = null;
  academicYears: string[] = [];
  semesters: string[] = [];
  loadingSessions: boolean = false;

  programs: Program[] = [];
  persons: Person[] = [];
  modules: Module[] = [];
  classes: Class[] = [];

  displayedColumns: string[] = ['prof', 'program', 'module', 'horaire', 'classe', 'day'];

  firstFormGroup = this._formBuilder.group({
    year: ['', Validators.required],
    semester: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({

  });

  thirdFormGroup = this._formBuilder.group({
    prof: ['', Validators.required],
    prog: ['', Validators.required],
    module: ['', Validators.required],
    heureDebut: ['', Validators.required],
    heureFin: ['', Validators.required],
    classe: ['', Validators.required],
    day: ['', Validators.required],
    capacity: ['', Validators.required]
  });


  errorMessage: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private examTableService: ExamTableService,
    private sessionService: SessionExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
  // Charger les programmes depuis le service
  this.loadAcademicYears();
  this.loadSemesters();

  this.firstFormGroup.get('semester')?.valueChanges.subscribe(semester => {
    if (semester) {
      this.sessionService.getProgramBySemester(semester).subscribe(data => {
        this.programs = data; // Utilisez `this` ici sans problème avec la fonction fléchée
      });
    }
  });




// Observer les changements dans la sélection du programme
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

// Observer les changements dans la capacité
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

  onSelectionChange(): void {
    if (this.selectedYear && this.selectedSemester) {
      this.examTableByYearBySemester(this.selectedSemester, this.selectedYear);
    }
  }

  loadAcademicYears(): void {
    this.examTableService.getAllExamTable().subscribe({
      next: (examtables) => {
        this.academicYears = [
          ...new Set(examtables.map((table) => table.academicYear)),
        ]; // Extract unique academic years
      },
      error: (err) => console.error('Error fetching academic years:', err),
    });
  }

  loadSemesters(): void {
    this.examTableService.getAllExamTable().subscribe({
      next: (examtables) => {
        this.semesters = [
          ...new Set(examtables.map((table) => table.semester)),
        ]; // Extract unique semesters
      },
      error: (err) => console.error('Error semsesters:', err),
    });
  }

  examTableByYearBySemester(semester: string, year: string): void {
    this.examTableService.checkIfExists(semester, year).subscribe({
      next: (exist: boolean) => {
        if (!exist) {
          const newExamTable: ExamTable = {
            id: 0, // ID initial avant enregistrement
            academicYear: year,
            semester: semester,
          };

          // Sauvegarde de l'examTable
          this.examTableService.saveexamTable(newExamTable).subscribe({
            next: (savedExamTable: ExamTable) => {
              // Assurez-vous de récupérer l'ID depuis la réponse de l'API
              this.idExamTable = savedExamTable.id;

              // Charger les sessions avec l'ID retourné
              this.sessionService.getSessionExamByExamCalendar(this.idExamTable).subscribe({
                next: (res: SessionExam[]) => {
                  this.processSessionExams(res); // Traiter les sessions récupérées
                },
                error: (err: HttpErrorResponse) => {
                  console.error('Erreur de récupération des sessions :', err);
                },
              });
            },
            error: (err: HttpErrorResponse) => {
              console.error('Erreur lors de la sauvegarde de l\'examTable :', err);
            },
          });
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
        next: (program) => (sessionExamWithDetails['programName'] = program.programName),
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
  }
  onYearSubmit(): void {
    const yearValue = this.firstFormGroup.get('year')?.value?.trim();
    const semesterValue = this.firstFormGroup.get('semester')?.value?.trim();
    if (yearValue && semesterValue) {
      this.dataSource = [];
      this.year = yearValue;
      this.semester = semesterValue;
      this.examTableByYearBySemester(semesterValue, yearValue);
      console.log('Les données sont bien récupéré');
    } else {
      console.log('Année invalide. Veuillez saisir une année valide.');
    }
  }


  addSessionExamRow(): void {
    const newRow: SessionExam = {
      id: 0,
      professorId: Number(this.thirdFormGroup.get('prof')?.value) || 0,
      programId: Number(this.thirdFormGroup.get('prog')?.value) || 0,
      moduleId: Number(this.thirdFormGroup.get('module')?.value) || 0,
      examPeriodDebut: this.thirdFormGroup.get('heureDebut')?.value?.trim() ?? '',

      examPeriodFin: this.thirdFormGroup.get('heureFin')?.value?.trim() ?? '',
      classId: Number(this.thirdFormGroup.get('classe')?.value),
      day: this.formatDateToUTC(this.thirdFormGroup.get('day')?.value ?? ''),
      examCalendarId: this.idExamTable,
      capacity: Number(this.thirdFormGroup.get('capacity')?.value),
    };

    this.sessionService.saveexamTable(newRow).subscribe({
      next: (res: SessionExam) => {
        console.log('Nouvelle ligne ajoutée :', res);
        this.dataSource.push(res);
        this.processSessionExams(this.dataSource);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur lors d ajout de la ligne :', err);
        this.errorMessage = 'Erreur lors d\'ajout de la ligne : ' + err.error; // L'erreur spécifique que vous voulez afficher

      },
    });
  }

  formatDateToUTC(date: any): string {
    const localDate = new Date(date);
    const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
    return utcDate.toISOString().split('T')[0];

  }

}
