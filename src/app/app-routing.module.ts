import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateClassComponent} from './create-class/create-class.component';
import {HomeComponent} from './home/home.component';
import {ClassViewComponent} from './class-view/class-view.component';
import {StudentViewComponent} from './student-view/student-view.component';
import {EditClassComponent} from './edit-class/edit-class.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'create', component: CreateClassComponent},
  {path: 'home', component: HomeComponent},
  {path: 'view/:id', component: ClassViewComponent},
  {path: 'student/:id', component: StudentViewComponent},
  {path: 'edit/:courseNum', component: EditClassComponent},
  {path: 'login', component: LoginComponent},
  {path: 'createUser', component: CreateUserComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
