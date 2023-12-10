  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  import { ReactiveFormsModule,FormsModule } from '@angular/forms';
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { LoginComponent } from './login/login.component';
  import { ExamComponent } from './exam/exam.component';
  import { RegisterComponent } from './register/register.component';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import{HttpClientModule} from '@angular/common/http';
  import { ExamResultComponent } from './exam-result/exam-result.component';
  import { ApiService } from './Service/api.service';
  import { RouterModule } from '@angular/router';
  import { SetupComponent } from './setup/setup.component';
  import { CommonModule } from '@angular/common';
import { SetupAnswerComponent } from './setup-answer/setup-answer.component';
  
  @NgModule({
    declarations: [
      SetupComponent,
      AppComponent,
      LoginComponent,
      ExamComponent,
      RegisterComponent,
      ExamResultComponent,
      SetupAnswerComponent,
     
      
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
