import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admins } from 'src/app/models/admins.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import Swal from 'sweetalert2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModuleServiceService } from 'src/app/services/module-service.service';
import { Module } from 'src/app/models/module.model';

@Component({
  selector: 'app-add-new-module',
  templateUrl: './add-new-module.component.html',
  styleUrls: ['./add-new-module.component.css']
})
export class AddNewModuleComponent {
  nameFormControl = new FormControl('', [Validators.required]);

  newFormGroup!: FormGroup;
  
  constructor(private fb: FormBuilder,private moduleService : ModuleServiceService, private router:Router) {}

  ngOnInit(): void {
    this.newFormGroup = this.fb.group({
      moduleName: this.fb.control(null),
    });
  }

  handleAdd() {
    this.newFormGroup.get('moduleName')?.setValue(this.nameFormControl.value);

    if (this.newFormGroup.valid) {
      const newModule: Module = this.newFormGroup.value;
      this.moduleService.saveModule(newModule).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 200) {
            // Display the message from the backend directly
            const message = typeof response.body === 'string' ? response.body : response.body|| 'Operation successful';

            Swal.fire('Succès', message, 'success');
            this.router.navigateByUrl('/modules');
          } else {
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du module.', 'error');
          }
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout du module.', 'error');
        }
      });
    } else {
      Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
    }
  }
  
}



