import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admins } from 'src/app/models/admins.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import Swal from 'sweetalert2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-new-admin',
  templateUrl: './add-new-admin.component.html',
  styleUrls: ['./add-new-admin.component.css']
})
export class AddNewAdminComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  newAdminFormGroup!: FormGroup;
  
  constructor(private fb: FormBuilder,private adminService : AdminServiceService, private router:Router) {}

  ngOnInit(): void {
    this.newAdminFormGroup = this.fb.group({
      name: this.fb.control(null),
      email: this.fb.control(null),
    });
  }

  

  handleAdd() {
    this.newAdminFormGroup.get('email')?.setValue(this.emailFormControl.value);
    this.newAdminFormGroup.get('name')?.setValue(this.nameFormControl.value);

    if (this.newAdminFormGroup.valid) {
      const newAdmin: Admins = this.newAdminFormGroup.value;
      this.adminService.saveAdmin(newAdmin).subscribe({
        next: (response) => {
          // Check if the status is 200 OK
          if (response.status === 200) {
            // Display the message from the backend directly
            const message = typeof response.body === 'string' ? response.body : response.body|| 'Operation successful';

            Swal.fire('Succès', message, 'success');
            this.router.navigateByUrl('/admins');
          } else {
            Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de l\'admin.', 'error');
          }
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l\'ajout de l\'admin.', 'error');
        }
      });
    } else {
      Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs du formulaire', 'error');
    }
  }
  
}

