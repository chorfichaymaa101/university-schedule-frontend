import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profs } from 'src/app/models/profs.models';
import { Program } from 'src/app/models/program.model';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import { ProgramServiceService } from 'src/app/services/program-service.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-prof',
  templateUrl: './edit-prof.component.html',
  styleUrls: ['./edit-prof.component.css']
})

export class EditProfComponent implements OnInit {
  editProfFormGroup!: FormGroup;
  prof!: Profs;

  programList: { programName: string; semester: string }[] = []; // Updated to an array of objects

  selectedPrograms = new FormControl<string[]>([], [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  
  constructor(private profService: ProfServiceService,
    private fb: FormBuilder,
    private programService : ProgramServiceService,
    private router: Router,private route : ActivatedRoute) {
    this.prof=this.router.getCurrentNavigation()?.extras.state as Profs;
  }

  fetch(): void{
      this.programService.getPrograms().subscribe({
          next: (response) => {
            console.log(response);
            this.programList = response.map((program: Program) => ({
              programName: program.programName,
              semester: program.semester,
            }));          },
          error: (err) => {
            console.error(err);
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du programme.', 'error');
          }
        });
        
    }

  
  ngOnInit(): void {
    this.fetch();
    this.editProfFormGroup = this.fb.group({
      name: [''],
      email: [''],     
      programNames: [[]], 
    });

    this.setFormValues();
  }


  setFormValues() {
    console.log("g",this.prof);
    if (this.prof) {
      console.log("program prof :", this.prof.programNames)
      this.emailFormControl.setValue(this.prof.email);
      this.nameFormControl.setValue(this.prof.name);
      this.selectedPrograms.setValue(this.prof.programNames); // Pre-select the programs


      this.editProfFormGroup.patchValue({
        name: this.prof.name,
        email: this.prof.email,
        programNames: this.prof.programNames,
      });
    }
  }

  handleUpdateProf() {
    this.editProfFormGroup.get('programNames')?.setValue(this.selectedPrograms.value);
    this.editProfFormGroup.get('email')?.setValue(this.emailFormControl.value);
    this.editProfFormGroup.get('name')?.setValue(this.nameFormControl.value);


    if (this.editProfFormGroup.valid && this.prof) {
      const updatedProf: Profs = {
        ...this.prof,
        ...this.editProfFormGroup.value
      };

      console.log("t", updatedProf);

      console.log('Selected Values:', this.editProfFormGroup.get('programNames'));
      console.log('Selected nom:', this.editProfFormGroup.get('name'));
 

      this.profService.updateProf(updatedProf.id,updatedProf).subscribe({
              next: (response) => {
                // Check if the status is 200 OK
                if (response.status === 200) {
                  // Display the message from the backend directly
                  const message = typeof response.body === 'string' ? response.body : response.body|| 'Operation successful';
      
                  Swal.fire('Succès', message, 'success');
                  this.router.navigateByUrl('/profs');
                } else {
                  Swal.fire('Erreur', 'Une erreur est survenue lors de la modification du professeur.', 'error');
                }
              },
              error: (err) => {
                console.error(err);
                Swal.fire('Erreur', 'Une erreur est survenue lors de  modification du professeur.', 'error');
              }
            });
    }
  }
}
