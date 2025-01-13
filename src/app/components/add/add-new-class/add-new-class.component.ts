import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ErrorStateMatcher } from '@angular/material/core';
import { ClassServiceService } from 'src/app/services/class-service.service';
import { Class } from 'src/app/models/class.model';

@Component({
  selector: 'app-add-new-class',
  templateUrl: './add-new-class.component.html',
  styleUrls: ['./add-new-class.component.css']
})
export class AddNewClassComponent {
  typeList: string[] = ["Amphi", "Salle", "Tp"];
  nameFormControl = new FormControl('', [Validators.required]);
  capacityFormControl = new FormControl(0, [Validators.required]);
  typeFormControl = new FormControl('', [Validators.required]);
  newFormGroup!: FormGroup;
  
  constructor(private fb: FormBuilder,private classService : ClassServiceService, private router:Router) {}

  ngOnInit(): void {
    this.newFormGroup = this.fb.group({
      classname: this.fb.control(null),
      type: this.fb.control(null),
      capacity: this.fb.control(null),
    });
  }

  handleAdd() {
    this.newFormGroup.get('classname')?.setValue(this.nameFormControl.value);
    this.newFormGroup.get('capacity')?.setValue(this.capacityFormControl.value);
    this.newFormGroup.get('type')?.setValue(this.typeFormControl.value);


    if (this.newFormGroup.valid) {
      const newClass: Class = this.newFormGroup.value;
      this.classService.saveClass(newClass).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 200) {
            // Display the message from the backend directly
            const message = typeof response.body === 'string' ? response.body : response.body|| 'Operation successful';

            Swal.fire('Succès', message, 'success');
            this.router.navigateByUrl('/classes');
          } else {
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de la classe.', 'error');
          }
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de la classe.', 'error');
        }
      });
    } else {
      Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
    }
  }
  
}


