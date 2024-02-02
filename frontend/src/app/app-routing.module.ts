import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestPageComponent } from './test-page/test-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { QuestionListComponent } from './question-list/question-list.component';
import { IntructionStepperComponent } from './intruction-stepper/intruction-stepper.component';
import { AvailableTestsComponent } from './available-tests/available-tests.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AttemtedCandidatesComponent } from './attemted-candidates/attemted-candidates.component';
import { ManageGroupComponent } from './manage-group/manage-group.component';
import { UploadedCandidateListComponent } from './uploaded-candidate-list/uploaded-candidate-list.component';
import { UploadQuestionComponent } from './upload-question/upload-question.component';
import { ListofusersComponent } from './list-of-users/list-of-users.component';
import { UserDetailsByGroupComponent } from './user-details-by-group/user-details-by-group.component';

import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { UserLoginComponent } from './user-login/user-login.component';
import { UploadCandidatesComponent } from './upload-candidates/upload-candidates.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { TestResultAnalysisComponent } from './test-result-analysis/test-result-analysis.component';
import { TestEndingMessageComponent } from './test-ending-message/test-ending-message.component';


const routes: Routes = [
  // { path: '', redirectTo: '/candidate-login', pathMatch: 'full' },
  // { path: 'fill-form', component: CandidateFormComponent },
  {path: 'user-login', component: UserLoginComponent},
  { path: 'testPage', component: TestPageComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuardService] },
  {path:'question-list',component:QuestionListComponent, canActivate: [AuthGuardService] },
  {path:'instruction-stepper', component:IntructionStepperComponent},
  {path:'available-tests',component:AvailableTestsComponent, canActivate: [AuthGuardService] },
  {path: 'create-question', component: CreateQuestionComponent},
  {path:'student-list',component:StudentListComponent},
  {path: 'attemted-candidates', component: AttemtedCandidatesComponent},
  {path:'manage-group',component:ManageGroupComponent, canActivate: [AuthGuardService]},
  {path:'userlist',component:ListofusersComponent},
  {path: 'user-list', component:ListofusersComponent },
  {path:'user-details',component:UserDetailsByGroupComponent},
  {path: 'uploaded-candidate-list', component: UploadedCandidateListComponent, canActivate: [AuthGuardService] },
  {path: 'create-question', component: CreateQuestionComponent},
  {path: 'upload-question', component: UploadQuestionComponent, canActivate: [AuthGuardService] },
  {path: 'test-result-analysis', component: TestResultAnalysisComponent},
  {path:'test-ending',component:TestEndingMessageComponent},
  { path: '**', component: NotFoundComponent },
  {path : 'logout',component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
