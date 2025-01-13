import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { NotFoundComponent } from './components/widgets/not-found/not-found.component';
import { SemesterTableComponent } from './components/semester-table/semester-table.component'
import { ExamTableComponent } from './components/exam-table/exam-table.component';
import { TimeTableComponent } from './components/time-table/time-table.component';


import { RequestFormComponent } from './demanderRattrapage/demanderRattrapage.component'; // Import the Request Form component
import { ProfModifierSeanceComponent } from './prof-modifier-seance/prof-modifier-seance.component'; // Import the Request Form component
import { NotificationsProfComponent } from './notifications-prof/notifications-prof.component';
import { NotificationsAdminComponent } from './notifications-admin/notifications-admin.component';
import { HistoriqueNotifsAdminComponent } from './historique-notifs-admin/historique-notifs-admin.component';
import { NotificationsStudentComponent } from './notifications-student/notifications-student.component';
import { NotificationsHeaderComponent } from './notifications-header/notifications-header.component';

import { HttpClientModule } from '@angular/common/http';

import { SemesterTableEditComponent  } from './components/semester-table-edit/semester-table-edit.component';
import {ExamTableEditComponent} from "./components/exam-table-edit/exam-table-edit.component";
import {TimeTableEditComponent} from "./components/time-table-edit/time-table-edit.component";
//import { ModifyTimeTableComponent } from './components/modify-exam/modify-exam.component';
//import { ModifyExamComponent } from './components/modify-time-table/modify-time-table.component';
import { GestionProfComponent } from './components/gestion/gestion-prof/gestion-prof.component';

import { GestionProgramComponent } from './components/gestion/gestion-program/gestion-program.component';
/*
import { EditProgramComponent } from './components/edit/edit-program/edit-program.component';
import { AddNewProgramComponent } from './components/add/add-new-program/add-new-program.component';
import { EditProfComponent } from './components/edit/edit-prof/edit-prof.component';
import { AddNewProfComponent } from './components/add/add-new-prof/add-new-prof.component';
import { GestionClassComponent } from './components/gestion/gestion-class/gestion-class.component';
import { EditClassComponent } from './components/edit/edit-class/edit-class.component';
import { AddNewClassComponent } from './components/add/add-new-class/add-new-class.component';
import { GestionModuleComponent } from './components/gestion/gestion-module/gestion-module.component';
import { EditModuleComponent } from './components/edit/edit-module/edit-module.component';
import { AddNewModuleComponent } from './components/add/add-new-module/add-new-module.component';
import { GestionAdminComponent } from './components/gestion/gestion-admin/gestion-admin.component';
import { EditAdminComponent } from './components/edit/edit-admin/edit-admin.component';
import { AddNewAdminComponent } from './components/add/add-new-admin/add-new-admin.component';

*/
const routes: Routes = [
  { path :'' , component: HomeComponent},
  { path: 'semesterTable',component: SemesterTableComponent},
  { path: 'examTable', component: ExamTableComponent},
  { path: 'timeTable', component: TimeTableComponent},
  { path: 'demanderRattrapage', component: RequestFormComponent },
  { path: 'notificationsProfesseur', component: NotificationsProfComponent },
  { path: 'changerSeance', component: ProfModifierSeanceComponent },
  { path: 'notificationsAdmin', component: NotificationsAdminComponent },
  { path: 'historiqueAdmin', component: HistoriqueNotifsAdminComponent },
  { path: 'notificationsEtudiant', component: NotificationsStudentComponent },
  { path: 'notifications-header', component: NotificationsHeaderComponent },
  { path: 'semester-table-edit', component: SemesterTableEditComponent },
  { path: 'time-table-edit', component: TimeTableEditComponent },
  { path: 'exam-table-edit', component: ExamTableEditComponent },
  { path :'home' , component: HomeComponent},
  { path :'profs' , component: GestionProfComponent},
  { path :'programs' , component: GestionProgramComponent},
  /*
  { path :'programs/edit' , component: EditProgramComponent},
 
  { path :'programs/add' , component: AddNewProgramComponent},
  { path :'classes' , component: GestionClassComponent},
  { path :'classes/edit' , component: EditClassComponent},
  { path :'classes/add' , component: AddNewClassComponent},
  { path :'modules' , component: GestionModuleComponent},
  { path :'modules/edit' , component: EditModuleComponent},
  { path :'modules/add' , component: AddNewModuleComponent},
  { path :'admins' , component: GestionAdminComponent},
  { path :'admins/edit' , component: EditAdminComponent},
  { path :'admins/add' , component: AddNewAdminComponent},
  */
    // not-found
    { path :'**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
