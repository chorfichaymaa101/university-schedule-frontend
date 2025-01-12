import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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
import { EditProgramComponent } from './components/edit/edit-program/edit-program.component';
import { GestionProgramComponent } from './components/gestion/gestion-program/gestion-program.component';
import { GestionProfComponent } from './components/gestion/gestion-prof/gestion-prof.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './components/widgets/login/login.component';
import { SignupComponent } from './components/widgets/signup/signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GestionAdminComponent } from './components/gestion/gestion-admin/gestion-admin.component';
import { GestionClassComponent } from './components/gestion/gestion-class/gestion-class.component';
import { GestionModuleComponent } from './components/gestion/gestion-module/gestion-module.component';
import { AddNewProgramComponent } from './components/add/add-new-program/add-new-program.component';
import { AddNewProfComponent } from './components/add/add-new-prof/add-new-prof.component';
import { AddNewAdminComponent } from './components/add/add-new-admin/add-new-admin.component';
import { AddNewClassComponent } from './components/add/add-new-class/add-new-class.component';
import { AddNewModuleComponent } from './components/add/add-new-module/add-new-module.component';
import { EditAdminComponent } from './components/edit/edit-admin/edit-admin.component';
import { EditClassComponent } from './components/edit/edit-class/edit-class.component';
import { EditModuleComponent } from './components/edit/edit-module/edit-module.component';
import { EditProfComponent } from './components/edit/edit-prof/edit-prof.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    //PageHeaderComponent,
    EditProgramComponent,
    NotFoundComponent,
    GestionProgramComponent,
    GestionProfComponent,
    GestionAdminComponent,
    GestionClassComponent,
    GestionModuleComponent,
    AddNewProgramComponent,
    AddNewProfComponent,
    AddNewAdminComponent,
    AddNewClassComponent,
    AddNewModuleComponent,
    EditProgramComponent,
    EditAdminComponent,
    EditClassComponent,
    EditModuleComponent,
    EditProfComponent,
    LoginComponent,
    SignupComponent,


   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
