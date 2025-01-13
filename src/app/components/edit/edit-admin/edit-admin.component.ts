import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admins } from 'src/app/models/admins.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  editFormGroup!: FormGroup;
  admin!: Admins;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  
  constructor(private adminService: AdminServiceService,
    private fb: FormBuilder,
    private router: Router,private route : ActivatedRoute) {
    this.admin=this.router.getCurrentNavigation()?.extras.state as Admins;
  }

  
  ngOnInit(): void {
    this.editFormGroup = this.fb.group({
      name: [''],
      email: [''],     
    });

    this.setFormValues();
  }


  setFormValues() {
    if (this.admin) {
      this.emailFormControl.setValue(this.admin.email);
      this.nameFormControl.setValue(this.admin.name);

      this.editFormGroup.patchValue({
        name: this.admin.name,
        email: this.admin.email,
      });
    }
  }

  handleUpdate() {
    this.editFormGroup.get('email')?.setValue(this.emailFormControl.value);
    this.editFormGroup.get('name')?.setValue(this.nameFormControl.value);


    if (this.editFormGroup.valid && this.admin) {
      const updatedAdmin: Admins = {
        ...this.admin,
        ...this.editFormGroup.value
      };


      this.adminService.updateAdmin(updatedAdmin.id,updatedAdmin).subscribe({
              next: (response) => {
                // Check if the status is 200 OK
                if (response.status === 200) {
                  // Display the message from the backend directly
                  const message = typeof response.body === 'string' ? response.body : response.body|| 'Operation successful';
      
                  Swal.fire('Succès', message, 'success');
                  this.router.navigateByUrl('/admins');
                } else {
                  Swal.fire('Erreur', 'Une erreur est survenue lors de la modification de l\'admin.', 'error');
                }
              },
              error: (err) => {
                console.error(err);
                Swal.fire('Erreur', 'Une erreur est survenue lors de  modification de l\'admin.', 'error');
              }
            });
    }
  }
}

