import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ExamComponent } from './exam/exam.component';
import { RegisterComponent } from './register/register.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { SetupComponent } from './setup/setup.component';
import { SetupAnswerComponent } from './setup-answer/setup-answer.component';

const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'exam', component:ExamComponent},
{path:'register', component:RegisterComponent},
{ path: 'exam-result', component: ExamResultComponent },
{ path: 'setup', component: SetupComponent },
{ path: 'setup-answer', component: SetupAnswerComponent },

{path:'**', redirectTo:"login", pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
