import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { CreateClassComponent } from './create-class/create-class.component';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatListModule,
          MatGridListModule, MatCardModule, MatDatepickerModule,
          MatNativeDateModule, MatIconModule, MatToolbarModule,
          MatStepperModule, MatTableModule, MatDialogModule,
          MatProgressSpinner, MatChipsModule, MatCheckbox, MatCheckboxModule, MatProgressBarModule} from '@angular/material';

import { HomeComponent } from './home/home.component';
import { TweetComponent } from './tweet/tweet.component';

import {HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {ExportDialogComponent, StudentViewComponent} from './student-view/student-view.component';
import { ClassViewComponent } from './class-view/class-view.component';

import {ChartsModule} from 'ng2-charts';
import {StudentService} from './services/student.service';
import {TweetsService} from './services/tweets.service';
import {SectionService} from './services/section.service';
import { EditClassComponent } from './edit-class/edit-class.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TimeGraphComponent } from './time-graph/time-graph.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateClassComponent,
    HomeComponent,
    TweetComponent,
    StudentViewComponent,
    ClassViewComponent,
    EditClassComponent,
    TimeGraphComponent,
    SideBarComponent,
    ExportDialogComponent,
    LoginComponent,
    CreateUserComponent,
    ForgotPasswordComponent
  ],
  entryComponents: [ExportDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatToolbarModule,
    MatStepperModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
    MatChipsModule,
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyCyIRubnGjWMGf58Ojs9k6l-82VJuixQ-A",
    authDomain: "academictwittercompanion.firebaseapp.com",
    databaseURL: "https://academictwittercompanion.firebaseio.com",
    projectId: "academictwittercompanion",
    storageBucket: "academictwittercompanion.appspot.com",
    messagingSenderId: "407272599412"
  }), //ajout
    AngularFireAuthModule, //ajout
    AngularFireDatabaseModule, //ajout
    ChartsModule],
  providers: [StudentService, TweetsService, SectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
