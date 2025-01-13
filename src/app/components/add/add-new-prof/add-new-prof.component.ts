import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profs } from 'src/app/models/profs.models';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import Swal from 'sweetalert2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
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
  selector: 'app-add-new-prof',
  templateUrl: './add-new-prof.component.html',
  styleUrls: ['./add-new-prof.component.css'],
})
export class AddNewProfComponent {

  programNames = new FormControl('');
  programList: string[] = [];

  selectedPrograms = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  newProfFormGroup!: FormGroup;
  
  constructor(private fb: FormBuilder,private programService : ProgramServiceService,private profService : ProfServiceService, private router:Router) {}

    async ngOnInit() {
    await this.fetch();
    this.newProfFormGroup = this.fb.group({
      name: this.fb.control(null),
      email: this.fb.control(null),
      programNames: this.fb.control([]),
    });
  }

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
  

  handleAddProf() {

    this.newProfFormGroup.get('programNames')?.setValue(this.selectedPrograms.value);
    this.newProfFormGroup.get('email')?.setValue(this.emailFormControl.value);
    this.newProfFormGroup.get('name')?.setValue(this.nameFormControl.value);

    if (this.newProfFormGroup.valid) {
      const newProf: Profs = this.newProfFormGroup.value;
      this.profService.saveProf(newProf).subscribe({
        next: (response) => {
          // Check if the status is 200 OK
          if (response.status === 200) {
            // Display the message from the backend directly
            const message = typeof response.body === 'string' ? response.body : response.body|| 'Operation successful';

            Swal.fire('Succès', message, 'success');
            this.router.navigateByUrl('/profs');
          } else {
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du professeur.', 'error');
          }
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du professeur.', 'error');
        }
      });
    } else {
      Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
    }
  }
  
}


/*
 nom: this.fb.control(null, [Validators.required]),
       cne: this.fb.control(null, [Validators.required]),
      prenom: this.fb.control(null, [Validators.required]),
      tel: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
       filliere: this.fb.control(null, [Validators.required]),
      login: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      specialite: this.fb.control(null, [Validators.required])
*/