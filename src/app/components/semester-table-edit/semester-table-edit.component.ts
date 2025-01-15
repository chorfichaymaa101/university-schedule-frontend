import {Component, OnInit, ViewChild} from '@angular/core';
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
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-semester-table-edit',
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
  templateUrl: './semester-table-edit.component.html',
  styleUrls: ['./semester-table-edit.component.css']
})
export class SemesterTableEditComponent implements OnInit {
  displayedColumns: string[] = ['dateDebut', 'designation'];
  dataSource: SemesterTable[] = [];
  academicYear: string = '';
  selectedRow: any;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({});

  thirdFormGroup = this._formBuilder.group({
    dateDebut: ['', Validators.required],
    dateFin: ['', Validators.required],
    designation: ['', [Validators.required, Validators.minLength(1)]], // Ensures non-empty value
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
      console.log('Les données sont bien récupérées');
    } else {
      console.log('Année invalide. Veuillez saisir une année valide.');
    }
  }

  // Handle row selection
  onRowSelect(row: any) {
    this.selectedRow = row;  // Store selected row data
    this.updateThirdForm();
  }

  // Pre-fill the third form with selected row data
  updateThirdForm() {
    if (this.selectedRow) {
      this.thirdFormGroup.patchValue({
        dateDebut: this.selectedRow.dateDebut,
        dateFin: this.selectedRow.dateFin,
        designation: this.selectedRow.designation
      });
    }
  }
  @ViewChild('stepper') stepper!: MatStepper;
  // Update function
  updateSemesterRow(): void {
    if (this.selectedRow) {
      const updatedSemester: SemesterTable = {
        ...this.selectedRow,
        dateDebut: this.formatDateToUTC(this.thirdFormGroup.get('dateDebut')?.value),
        dateFin: this.formatDateToUTC(this.thirdFormGroup.get('dateFin')?.value),
        designation: this.thirdFormGroup.get('designation')?.value || '',  // Ensure a valid string
      };

      this.semesterTableService.updateSemesterTable(updatedSemester).subscribe({
        next: () => {
          console.log('Mise à jour réussie');
          this.getSemestertableByYear(this.academicYear); // Refresh the data

          // Navigate back to second step
          this.stepper.previous();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Erreur de mise à jour :', err);
        },
      });
    }
  }

  // Helper function to format the date as UTC
  formatDateToUTC(date: any): string {
    const localDate = new Date(date);
    const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
    return utcDate.toISOString().split('T')[0];
  }

  // Handle row selection for editing
  //onRowSelect(row: SemesterTable): void {
    //this.selectedRow = row;
    //this.thirdFormGroup.patchValue({
      //dateDebut: row.dateDebut,
      //dateFin: row.dateFin,
      //designation: row.designation,
    //});
  //}
}
