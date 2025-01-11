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
  { path: 'demanderRattrapage', component: RequestFormComponent },
  { path: 'notificationsProfesseur', component: NotificationsProfComponent },
  { path: 'changerSeance', component: ProfModifierSeanceComponent },
  { path: 'notificationsAdmin', component: NotificationsAdminComponent },
  { path: 'historiqueAdmin', component: HistoriqueNotifsAdminComponent },
  { path: 'notificationsEtudiant', component: NotificationsStudentComponent },
  { path: 'notifications-header', component: NotificationsHeaderComponent },

  
    // not-found
    { path :'**' , component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
