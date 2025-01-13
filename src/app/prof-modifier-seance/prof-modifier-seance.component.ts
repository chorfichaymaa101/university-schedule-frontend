import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

interface Module {
  id: number;
  moduleName: string;
}

interface Program {
  id: number;
  programName: string;
}

interface Semester {
  semesterId: number;
  semester: number;
}

interface Class {
  id: number;
  classname: string;
}

@Component({
  selector: 'app-prof-modifier-seance',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './prof-modifier-seance.component.html',
  styleUrls: ['./prof-modifier-seance.component.css']
})

export class ProfModifierSeanceComponent implements OnInit {
  modules: Module[] = [];  // Initialize to an empty array
  programs: Program[] = [];  // Initialize to an empty array
  semesters: Semester[] = [];  // Initialize to an empty array
  classes: Class[] = [];  // Initialize to an empty array

  
  public username: string = "";
  public userId: number = 0;
  public role: string = "";
  

  constructor(private cookieService: CookieService,private http: HttpClient, private route: ActivatedRoute, private authService: AuthService) {}

  async ngOnInit() {
    await this.fetchModules(); 
    await this.fetchPrograms(); 
    await this.fetchSemesters(); 
    await this.fetchClasses(); 

    
    this.username = this.cookieService.get('username');
    this.userId = +this.cookieService.get('userId'); // Convert to number
    this.role = this.cookieService.get('role');
 
  }

  async fetchModules() {
    try {
      const apiUrl = 'http://localhost:1000/api/modules';
      const modules = await this.http.get<Module[]>(apiUrl).toPromise(); // Convert observable to promise
      this.modules = modules || [];  // Ensure modules is always an array, even if undefined or null is returned
      console.log('Modules fetched:', modules);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  }

  async fetchPrograms() {
    try {
      const apiUrl = 'http://localhost:1000/api/programs';
      const programs = await this.http.get<Program[]>(apiUrl).toPromise(); // Convert observable to promise
      this.programs = programs || [];  // Ensure modules is always an array, even if undefined or null is returned
      console.log('Programs fetched:', programs);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  }

  async fetchSemesters() {
    try {
      const apiUrl = 'http://localhost:1000/api/semesters';
      const semesters = await this.http.get<Semester[]>(apiUrl).toPromise(); // Convert observable to promise
      this.semesters = semesters || [];  // Ensure modules is always an array, even if undefined or null is returned
      console.log('Semesters fetched:', semesters);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    }
  }

  async fetchClasses() {
    try {
      const apiUrl = 'http://localhost:1000/api/classes';
      const classes = await this.http.get<Class[]>(apiUrl).toPromise(); // Convert observable to promise
      this.classes = classes || [];  // Ensure modules is always an array, even if undefined or null is returned
      console.log('Classes fetched:', classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  }



  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      console.log('Selected Module ID:', formData.moduleId);
      console.log('Selected Program ID:', formData.programId);
      console.log('Selected Semester ID:', formData.semesterId);

      const requestData = {
        professorId: this.userId,                
        moduleId: Number(formData.moduleId),            
        programId: Number(formData.programId), 
        semesterId: Number(formData.semesterId),              
        oldTime: formData.oldTime,   
        endOldTime: formData.endOldTime,   
        oldDay: formData.oldDay,                          
        newDay: formData.newDay,   
        oldClass: Number(formData.oldClass), 
        newClass: Number(formData.newClass),                      
        newTime: formData.newTime,          
        endNewTime: formData.endNewTime,   
        status: "Pending",                               
        creationDate: new Date().toISOString().split('T')[0]
      };

      const apiUrl = 'http://localhost:1000/api/requests/new';
      console.log('Submitting request data:', requestData);

      this.http.post(apiUrl, requestData).subscribe({
        next: (response) => {
          console.log('Request created successfully:', response);
          alert('Request submitted successfully!');
          form.reset();
        },
        error: (error) => {
          console.error('Error creating request:', error);
          alert('An error occurred while submitting the request.');
        },
      });
    } else {
      console.log('Form is invalid');
      alert('Please fill in all required fields.');
    }
  }

}
