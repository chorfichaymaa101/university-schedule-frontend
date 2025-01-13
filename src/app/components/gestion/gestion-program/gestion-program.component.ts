import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Program } from 'src/app/models/program.model';
import { ProgramServiceService } from 'src/app/services/program-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-program',
  templateUrl: './gestion-program.component.html',
  styleUrls: ['./gestion-program.component.css']
})
export class GestionProgramComponent implements OnInit {
  programs!: Program[];
  modulesperProgram!: string[];
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
    private programService: ProgramServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.showPrograms();
    
  } 

  handleEdit(programedit: Program) {
     this.router.navigateByUrl('/programs/edit',{state :programedit});
  }

  
  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
    this.showPrograms();
  }  

  showPrograms() {
    const kw = this.searchFormGroup?.value.keyword;
    this.programService.getPrograms().subscribe({
      next: (data) => {
        this.programs = data;
        console.log(data);
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

  handleDelete(program: Program) {
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
      this.programService.deleteProgram(program.id).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
        }
      });
    }
      this.programs.splice( this.programs.indexOf(program),1);

    }
  )
}


 
}

