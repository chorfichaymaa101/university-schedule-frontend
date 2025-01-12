import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Admins } from 'src/app/models/admins.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-admin',
  templateUrl: './gestion-admin.component.html',
  styleUrls: ['./gestion-admin.component.css']
})
export class GestionAdminComponent implements OnInit {
  admins!: Admins[];
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  page: number = 0;
  size: number = 6;
  totalPages: number = 0;
  currentPage: number = 0;
  totalelements:number=0;
  displayedPages: number[] = [];
  option1:number=0;
  option2:number=0;
  option3:number=0;
  option4:number=0;

  constructor(
    private adminService: AdminServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.showAdmins();
    
  } 

  handleEdit(adminedit: Admins) {
     this.router.navigateByUrl('/admins/edit',{state :adminedit});
  }

  
  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
    this.showAdmins();
  }  

  showAdmins() {
    const kw = this.searchFormGroup?.value.keyword;
    this.adminService.getAdmins().subscribe({
      next: (data) => {
        this.admins = data;
        /*this.totalPages = data.totalPages;
        this.currentPage = data.number;
        this.totalelements=data.totalElements*/
        console.log("data",data);
        this.option1=Math.ceil(this.totalelements/4)
        this.option2= Math.ceil((this.totalelements/2))
        this.option3=Math.ceil((this.totalelements/4)*3)
        this.option4=this.totalelements;
      },
      error: (err) => {
        this.errorMessage = err;
        console.log(err);
      }
    });
  }

  handleDelete(admin: Admins) {
  Swal.fire({
    title: 'Vous etes sur?',
    text: "Vous ne pourrez pas revenir en arrière!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.adminService.deleteAdmin(admin.id).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
        }
      });
    }
      this.admins.splice( this.admins.indexOf(admin),1);

    }
  )
}


 
}
