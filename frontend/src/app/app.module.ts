import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {CountdownModule} from 'ngx-countdown';
import { InstructionsComponent } from './instructions/instructions.component';
import { TestPageComponent } from './test-page/test-page.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component'
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { AvailableTestsComponent } from './available-tests/available-tests.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CandidateLoginComponent } from './candidate-login/candidate-login.component';
// import { UserLoginComponent } from './user-login/user-login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { QuestionService } from './services/question.service';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { QuestionListComponent } from './question-list/question-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentListComponent } from './student-list/student-list.component';
import { DxDataGridModule } from 'devextreme-angular';
import { AttemtedCandidatesComponent } from './attemted-candidates/attemted-candidates.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ManageGroupComponent } from './manage-group/manage-group.component';
import { IntructionStepperComponent } from './intruction-stepper/intruction-stepper.component';
import { UploadedCandidateListComponent } from './uploaded-candidate-list/uploaded-candidate-list.component';
import { UploadQuestionComponent } from './upload-question/upload-question.component';
import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';
import { ListofusersComponent } from './list-of-users/list-of-users.component';
import { UserDetailsByGroupComponent } from './user-details-by-group/user-details-by-group.component';
import { TimerComponent } from './timer/timer.component';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UploadCandidatesComponent } from './upload-candidates/upload-candidates.component';
import { TestResultAnalysisComponent } from './test-result-analysis/test-result-analysis.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { EmailMessageComponent } from './email-message/email-message.component';
import { UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './custom-url-serializer';
import { TestEndingMessageComponent } from './test-ending-message/test-ending-message.component';
import { NoRightClickService } from './services/no-right-click.service';
import { TabSwitchService } from './services/tab-switch.service';
import { TabSwitchAlertComponent } from './tab-switch-alert/tab-switch-alert.component';
import { ConsoleDetectionService } from './services/console-detection.service';
import { MatNativeDateModule } from '@angular/material/core';
import { QuestionPreviewComponent } from './question-preview/question-preview.component';
import { CreateQuestionComponent } from './create-question/create-question.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateFormComponent,
    InstructionsComponent,
    TestPageComponent,
    AdminDashboardComponent,
    NewUserFormComponent,
    NavbarComponent,
    AvailableTestsComponent,
  
    // UserLoginComponent,
    LogoutComponent,
    QuestionListComponent,
    IntructionStepperComponent,
    SideNavbarComponent,
    AttemtedCandidatesComponent,
    CreateUserComponent,
    NavigationComponent,
    StudentListComponent,
    AttemtedCandidatesComponent,
    UploadedCandidateListComponent,
    UploadQuestionComponent,
    ManageGroupComponent,
    CreateGroupDialogComponent,
    ListofusersComponent,
    TimerComponent,
    UserDetailsByGroupComponent,
    QuestionDialogComponent,
    NotFoundComponent,
    UploadCandidatesComponent,
    TestResultAnalysisComponent,
    EmailMessageComponent,
    TestEndingMessageComponent,
    TabSwitchAlertComponent,
    QuestionPreviewComponent,
    CreateQuestionComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CountdownModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,MatToolbarModule, MatTooltipModule,
    MatCardModule,MatRadioModule,
    CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
   ],
  exports: [
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
   MatSidenavModule,
    MatStepperModule,
 MatSlideToggleModule,
    MatListModule,
 MatCheckboxModule,
 MatDialogModule
  ],
  providers: [
    { provide: UrlSerializer, useClass: CustomUrlSerializer },
    AuthService, AuthGuardService, QuestionService,NoRightClickService,TabSwitchService,ConsoleDetectionService],
  bootstrap: [AppComponent]
})
export class AppModule { } 

