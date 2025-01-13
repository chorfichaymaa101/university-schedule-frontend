import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from 'src/app/models/class.model';
import { ClassServiceService } from 'src/app/services/class-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  typeList: string[] = ["Amphi", "Salle", "Tp"];
  editFormGroup!: FormGroup;
  class!: Class;
  capacityFormControl = new FormControl(0, [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  typeFormControl = new FormControl('', [Validators.required]);

  constructor(private classService: ClassServiceService,
    private fb: FormBuilder,
    private router: Router,private route : ActivatedRoute) {
    this.class=this.router.getCurrentNavigation()?.extras.state as Class;
  }

  
  ngOnInit(): void {
    this.editFormGroup = this.fb.group({
      classname: [''],
      capacity: Number, 
      type: [''],    
    });

    this.setFormValues();
  }


  setFormValues() {
    if (this.class) {
      this.capacityFormControl.setValue(this.class.capacity);
      this.nameFormControl.setValue(this.class.classname);
      this.typeFormControl.setValue(this.class.type);


      this.editFormGroup.patchValue({
        classname: this.class.classname,
        capacity: this.class.capacity,
        type: this.class.type,
      });
    }
  }

  handleUpdate() {
    this.editFormGroup.get('capacity')?.setValue(this.capacityFormControl.value);
    this.editFormGroup.get('classname')?.setValue(this.nameFormControl.value);
    this.editFormGroup.get('type')?.setValue(this.typeFormControl.value);


    if (this.editFormGroup.valid && this.class) {
      const updatedClass: Class = {
        ...this.class,
        ...this.editFormGroup.value
      };


      this.classService.updateClass(updatedClass.id,updatedClass).subscribe({
              next: (response) => {
                // Check if the status is 200 OK
                if (response.status === 200) {
                  // Display the message from the backend directly
                  const message = typeof response.body === 'string' ? response.body : response.body|| 'Operation successful';
      
                  Swal.fire('Succès', message, 'success');
                  this.router.navigateByUrl('/classes');
                } else {
                  Swal.fire('Erreur', 'Une erreur est survenue lors de la modification de la classe.', 'error');
                }
              },
              error: (err) => {
                console.error(err);
                Swal.fire('Erreur', 'Une erreur est survenue lors de  modification de la classe.', 'error');
              }
            });
    }
  }
}


