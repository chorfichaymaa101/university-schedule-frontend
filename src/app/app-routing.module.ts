import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { NotFoundComponent } from './components/widgets/not-found/not-found.component';
import { SemesterTableComponent } from './components/semester-table/semester-table.component'
import { ExamTableComponent } from './components/exam-table/exam-table.component';
import { TimeTableComponent } from './components/time-table/time-table.component';

const routes: Routes = [
  { path :'' , component: HomeComponent},
  {
    path: 'semesterTable',
    component: SemesterTableComponent
  },
  {
    path: 'examTable',
    component: ExamTableComponent
  },
  {
    path: 'timeTable',
    component: TimeTableComponent
  },
  
    // not-found
    { path :'**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
