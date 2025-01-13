import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Class } from 'src/app/models/class.model';
import { ClassServiceService } from 'src/app/services/class-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-class',
  templateUrl: './gestion-class.component.html',
  styleUrls: ['./gestion-class.component.css']
})
export class GestionClassComponent implements OnInit {
  classes!: Class[];
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
    private classService: ClassServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.showClasses();
    
  } 

  handleEdit(classedit: Class) {
     this.router.navigateByUrl('/classes/edit',{state :classedit});
  }

  
  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
    this.showClasses();
  }  

  showClasses() {
    const kw = this.searchFormGroup?.value.keyword;
    this.classService.getClasses().subscribe({
      next: (data) => {
        this.classes = data;
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

  handleDelete(classe: Class) {
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
      this.classService.deleteClass(classe.id).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
        }
      });
    }
      this.classes.splice( this.classes.indexOf(classe),1);

    }
  )
}


 
}


