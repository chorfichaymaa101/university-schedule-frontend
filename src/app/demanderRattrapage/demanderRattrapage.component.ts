import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

@Component({
  selector: 'app-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './demanderRattrapage.component.html',
  styleUrls: ['./demanderRattrapage.component.css'],
})

export class RequestFormComponent implements OnInit {
  modules: Module[] = [];  // Initialize to an empty array
  programs: Program[] = [];  // Initialize to an empty array
  semesters: Semester[] = [];  // Initialize to an empty array

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await this.fetchModules(); // Wait for data before proceeding
    await this.fetchPrograms(); // Wait for data before proceeding
    await this.fetchSemesters(); // Wait for data before proceeding
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
  // Handle form submission
  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;
      console.log('Selected Module ID:', formData.moduleId);
      console.log('Selected Program ID:', formData.programId);
      console.log('Selected Semester ID:', formData.semesterId);

      const requestData = {
        professorId: formData.professorId,                
        moduleId: Number(formData.moduleId),            
        programId: Number(formData.programId),           
        sessionClassId: null,                           
        semesterId: Number(formData.semesterId),         
        time: formData.time,                             
        endTime: formData.endTime,                             
        day: formData.day,                               
        status: "Pending",                               
        creationDate: new Date().toISOString().split('T')[0]
      };

      const apiUrl = 'http://localhost:1000/api/requests';
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

  // Call this method when you want to reload the page
  
}
