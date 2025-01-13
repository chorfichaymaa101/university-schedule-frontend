import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from 'src/app/models/module.model';
import { Program } from 'src/app/models/program.model';
import { ModuleServiceService } from 'src/app/services/module-service.service';
import { ProgramServiceService } from 'src/app/services/program-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css']
})
export class EditProgramComponent implements OnInit {
  semesterList: string[] = ["0","1","2","3","4","5","6","7","8","9"];
  moduleList: string[] = [];
  moduleNames = new FormControl(['']);
  semester = new FormControl(0);
  selectedModules = new FormControl('', [Validators.required]);

  editFormGroup!: FormGroup;
  program!: Program;
  semesterFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  
  constructor(private programservice: ProgramServiceService,
    private fb: FormBuilder,
    private moduleService : ModuleServiceService,
    private router: Router,private route : ActivatedRoute) {
    this.program=this.router.getCurrentNavigation()?.extras.state as Program;
  }

  
  ngOnInit(): void {
    this.fetch();
    this.editFormGroup = this.fb.group({
      programName: [''],
      semester: [''],  
      moduleNames: [[]],
   
    });

    this.setFormValues();
  }

  fetch(): void{
      this.moduleService.getModules().subscribe({
          next: (response) => {
            console.log(response);
            this.moduleList = response.map((module: Module) => module.moduleName);
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du module.', 'error');
          }
        });
      
    }

  setFormValues() {
    if (this.program) {
      this.semesterFormControl.setValue(this.program.semester);
      this.nameFormControl.setValue(this.program.programName);
      this.moduleNames.setValue(this.program.modulesNames);

      this.editFormGroup.patchValue({
        programName: this.program.programName,
        semester: this.program.semester,
        moduleNames: this.program.modulesNames,
      });
    }
  }

  handleUpdate() {
    this.editFormGroup.get('semester')?.setValue(this.semesterFormControl.value);
    this.editFormGroup.get('programName')?.setValue(this.nameFormControl.value);
    this.editFormGroup.get('moduleNames')?.setValue(this.moduleNames.value);


    if (this.editFormGroup.valid && this.program) {
      const updatedProgram: Program = {
        ...this.program,
        ...this.editFormGroup.value
      };


      this.programservice.updateProgram(updatedProgram.id,updatedProgram).subscribe({
              next: (response) => {
                // Check if the status is 200 OK
                if (response.status === 200) {
                  // Display the message from the backend directly
                  const message = typeof response.body === 'string' ? response.body : response.body|| 'Operation successful';
      
                  Swal.fire('Succès', message, 'success');
                  this.router.navigateByUrl('/programs');
                } else {
                  Swal.fire('Erreur', 'Une erreur est survenue lors de la modification du program.', 'error');
                }
              },
              error: (err) => {
                console.error(err);
                Swal.fire('Erreur', 'Une erreur est survenue lors de  modification du program.', 'error');
              }
            });
    }
  }
}


