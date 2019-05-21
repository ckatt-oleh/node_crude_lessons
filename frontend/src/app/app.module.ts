import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { MatToolbarModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule, 
  MatDividerModule, 
  MatSnackBarModule } from '@angular/material';


import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { DeleteComponent } from './components/delete/delete.component';
import { GetComponent } from './components/get/get.component';
import { UserService } from './user.service';
import { from } from 'rxjs';

const routes: Routes = [
  { 
    path: 'register', 
    component: CreateComponent, 
    data: { title: 'Create User' }
  },
  { 
    path: 'profile/:id', 
    component: EditComponent,
    data: { title: 'Edit User' }
  },
  {
    path: 'profile/:id',
    component: GetComponent,
    data: { title: 'Get User' }
  },
  {
    path: 'profile/:id',
    component: DeleteComponent,
    data: { title: 'Delete User' }
  },
  {
    path: 'profiles',
    component: ListComponent,
    data: { title: 'List of users' }
  },
  { 
    path: '', 
    redirectTo: '/profiles', 
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    EditComponent,
    ListComponent,
    DeleteComponent,
    GetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
