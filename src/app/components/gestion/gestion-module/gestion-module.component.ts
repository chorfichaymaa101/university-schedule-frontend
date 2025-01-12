import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Module } from 'src/app/models/module.model';
import { ModuleServiceService } from 'src/app/services/module-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestion-module',
  templateUrl: './gestion-module.component.html',
  styleUrls: ['./gestion-module.component.css']
})
export class GestionModuleComponent implements OnInit {
  modules!: Module[];
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
    private moduleServie: ModuleServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.showModules();
    
  } 

  handleEdit(moduleedit: Module) {
     this.router.navigateByUrl('/modules/edit',{state :moduleedit});
  }

  
  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
    this.showModules();
  }  

  showModules() {
    const kw = this.searchFormGroup?.value.keyword;
    this.moduleServie.getModules().subscribe({
      next: (data) => {
        this.modules = data;
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

  handleDelete(module: Module) {
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
      this.moduleServie.deleteModule(module.id).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
        }
      });
    }
      this.modules.splice( this.modules.indexOf(module),1);

    }
  )
}


 
}


