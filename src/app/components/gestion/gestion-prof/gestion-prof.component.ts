import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Profs } from 'src/app/models/profs.models';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-prof',
  templateUrl: './gestion-prof.component.html',
  styleUrls: ['./gestion-prof.component.css']
})
export class GestionProfComponent implements OnInit {
  profs!: Profs[];
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
    private profService: ProfServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.showProfs();
    
  } 

  handleEditeProf(profedit: Profs) {
     this.router.navigateByUrl('/profs/edit',{state :profedit});
  }

  
  handleChangeSize($event: Event) {
    this.size = parseInt((<HTMLInputElement>$event.target).value);
    this.showProfs();
  }  

  showProfs() {
    const kw = this.searchFormGroup?.value.keyword;
    this.profService.getProfs(this.page, this.size).subscribe({
      next: (data) => {
        this.profs = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
        this.totalelements=data.totalElements;
        this.setDisplayedPages();
        console.log(data);
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

  handleSearchCustomers() {
    const kw = this.searchFormGroup?.value.keyword;
    this.profService.searchProfs(kw, this.page, this.size).subscribe({
      next: (data) => {
        this.profs = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
        this.totalelements=data.totalElements;
        this.setDisplayedPages();
        console.log(data);
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

  handleDeleteProf(prof: Profs) {
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
      this.profService.deleteProf(prof.id).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          this.errorMessage = err;
          console.log(err);
        }
      });
    }
      this.profs.splice( this.profs.indexOf(prof),1);

    }
  )
}


  setDisplayedPages() {
    this.displayedPages = [];
    const startPage = Math.floor(this.currentPage / 3) * 3;
    for (let i = startPage; i < startPage + 3 && i < this.totalPages; i++) {
      this.displayedPages.push(i);
    }
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.page = page; // Update the page parameter
    this.showProfs();
  }

  goToPreviousSet() {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage - 3 >= 0) {
      this.currentPage = startPage - 3;
      this.page = this.currentPage; // Update the page parameter
      this.showProfs();
    }
  }

  goToNextSet() {
    const startPage = Math.floor(this.currentPage / 3) * 3;
    if (startPage + 3 < this.totalPages) {
      this.currentPage = startPage + 3;
      this.page = this.currentPage; // Update the page parameter
      this.showProfs();
    }
  }
}
