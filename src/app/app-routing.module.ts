import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { NotFoundComponent } from './components/widgets/not-found/not-found.component';
import { SemesterTableComponent } from './components/semester-table/semester-table.component'
import { ExamTableComponent } from './components/exam-table/exam-table.component';
import { TimeTableComponent } from './components/time-table/time-table.component';
import { SemesterTableEditComponent  } from './components/semester-table-edit/semester-table-edit.component';
//import { ModifyTimeTableComponent } from './components/modify-exam/modify-exam.component';
//import { ModifyExamComponent } from './components/modify-time-table/modify-time-table.component';

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
  { path: 'semester-table-edit', component: SemesterTableEditComponent },
  //{ path: 'modify-time-table', component: ModifyTimeTableComponent },
  //{ path: 'modify-exam', component: ModifyExamComponent },

    // not-found
    { path :'**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
