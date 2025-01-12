import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SemesterTable } from 'src/app/models/semester-table.model';
import { SemesterTableService } from 'src/app/services/semester-table.service';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-semester-table',
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
    MatNativeDateModule
  ],
  templateUrl: './semester-table.component.html',
  styleUrls: ['./semester-table.component.css'],
})
export class SemesterTableComponent implements OnInit {


  displayedColumns: string[] = ['dateDebut', 'designation'];
  dataSource: SemesterTable[] = []; 
  academicYear: string = ''; 
  errorMessage: string = '';

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    
  });

  thirdFormGroup = this._formBuilder.group({
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    designation: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private semesterTableService: SemesterTableService
  ) {}

  ngOnInit(): void {}


  getSemestertableByYear(academicYear: string): void {
    this.semesterTableService.getSemestertableByYear(academicYear).subscribe({
      next: (res: SemesterTable[]) => {
        this.dataSource = res; 
        console.log('Données récupérées :', this.dataSource);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur de récupération :', err);
      },
    });
  }


  onYearSubmit(): void {
    const yearValue = this.firstFormGroup.get('firstCtrl')?.value?.trim();
    if (yearValue) {
      this.academicYear = yearValue; 
      this.getSemestertableByYear(yearValue); 
      console.log('Les données sont bien récupéré');
    } else {
      console.log('Année invalide. Veuillez saisir une année valide.');
    }
  }



  addSemesterRow(): void {
    const newRow: SemesterTable = {
      id: 0,
      dateDebut: this.formatDateToUTC(this.thirdFormGroup.get('dateDebut')?.value ?? ''),
      dateFin: this.formatDateToUTC(this.thirdFormGroup.get('dateFin')?.value ?? ''),
      designation: this.thirdFormGroup.get('designation')?.value ?? '',
      year: this.academicYear,
    };
  
    this.semesterTableService.savesemesterTable(newRow).subscribe({
      next: (res: SemesterTable) => {
        console.log('Nouvelle ligne ajoutée :', res);
        this.dataSource.push(res);
        this.dataSource = [...this.dataSource];
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur lors d ajout de la ligne :', err);
        this.errorMessage = 'Erreur lors d\'ajout de la ligne : ' + err.error;
      },
    });
  }

  formatDateToUTC(date: any): string {
    const localDate = new Date(date);
    const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
    return utcDate.toISOString().split('T')[0];
    
  }
  
}