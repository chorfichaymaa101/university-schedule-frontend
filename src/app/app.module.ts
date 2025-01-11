import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/dashboard/app.component';
import { SidebarComponent } from './components/widgets/sidebar/sidebar.component';
import { NavbarComponent } from './components/widgets/navbar/navbar.component';
import { FooterComponent } from './components/widgets/footer/footer.component';
//import { PageHeaderComponent } from './components/widgets/page-header/page-header.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NotFoundComponent } from './components/widgets/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SemesterTableEditComponent } from './components/semester-table-edit/semester-table-edit.component';
import { ExamTableEditComponent } from './components/exam-table-edit/exam-table-edit.component';
//import { ModifySemesterComponent } from './components/modify-semester/modify-semester.component';
//import { ModifyTimeTableComponent } from './components/modify-time-table/modify-time-table.component';
//import { ModifyExamComponent } from './components/modify-exam/modify-exam.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    //PageHeaderComponent,

    NotFoundComponent,
    //ModifySemesterComponent,
    //ModifyTimeTableComponent,
    //ModifyExamComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SemesterTableEditComponent,
    ExamTableEditComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
