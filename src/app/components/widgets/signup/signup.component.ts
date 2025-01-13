import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import {Student} from '../../../models/student.models'
import { ErrorStateMatcher } from '@angular/material/core';
import { ProgramServiceService } from 'src/app/services/program-service.service';
import { Program } from 'src/app/models/program.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  programNames = new FormControl('');
  programList: string[] = [];
  semesterList: number[] = [0,1,2,3,4,5,6,7,8,9];
  selectedSemesters = new FormControl('', [Validators.required]);

  selectedPrograms = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  
  newStudentFormGroup!: FormGroup;

  constructor(
      private authService: AuthService,
      private programService : ProgramServiceService,
      private fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
    ) {}

  fetch(): void{
      this.programService.getPrograms().subscribe({
          next: (response) => {
            console.log(response);
            this.programList = response.map((program: Program) => program.programName);
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du programme.', 'error');
          }
        });
        
    }

    ngOnInit(): void {
      this.fetch();
      this.newStudentFormGroup = this.fb.group({
        name: this.fb.control(null),
        email: this.fb.control(null),
        semesterId: this.fb.control(null),
        programName: this.fb.control(null),
      });
    }
  

  SignUp(): void {
    this.newStudentFormGroup.get('programName')?.setValue(this.selectedPrograms.value);
    this.newStudentFormGroup.get('email')?.setValue(this.emailFormControl.value);
    this.newStudentFormGroup.get('name')?.setValue(this.nameFormControl.value);
    this.newStudentFormGroup.get('semesterId')?.setValue(this.selectedSemesters.value);

    console.log(this.selectedPrograms.value);
    console.log(this.emailFormControl.value);
    console.log(this.nameFormControl.value);
    console.log(this.selectedSemesters.value);


  
    if (this.newStudentFormGroup.valid) {
          const newStudent: Student = this.newStudentFormGroup.value;
          this.authService.SignUp(newStudent).subscribe({
            next: (response) => {
              // Check if the status is 200 OK
              console.log(response.status);
              if (response.status === 200) {
                // Display the message from the backend directly
                const message = typeof response.body === 'string' ? response.body : response.body|| 'Operation successful';
    
                Swal.fire('Succès', message, 'success');
                this.router.navigateByUrl('/');
              } else {
                Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de l etudiant.', 'error');
              }
            },
            error: (err) => {
              console.error(err);
              Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de l etudiant.', 'error');
            }
          });
        } else {
          Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
        }
      }

}
