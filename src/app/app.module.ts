import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ChartModule } from 'angular-highcharts';
//File Upload 
import { FileUploadModule } from 'ng2-file-upload';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatRadioModule, MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule, MatSelectModule, MatSlideToggleModule, MatProgressBarModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatTableModule, MatDialogModule,MatAutocompleteModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressInterceptor } from './service/ProgressInterceptor';
import { ProgressComponent } from './common/internet/ProgressComponent';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './home/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ListenterpriseComponent } from './baseline/enterprise/listenterprise/listenterprise.component';
import { EditenterpriseComponent } from './baseline/enterprise/editenterprise/editenterprise.component';
import { EwepserverService } from './ewepserver.service';
import { GlobalService } from './service/Global';
import { SearchEnterpriseComponent } from './baseline/enterprise/search-enterprise/search-enterprise.component';
import { DistrictMetroPipe } from './district-metro.pipe';
import { MunicipalityPipe } from './municipality.pipe';
import { MainPlacePipe } from './main-place.pipe';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { MenuComponent } from './home/menu/menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ListComponent } from './admin/user/list/list.component';
import { EditUserComponent } from './admin/user/edit/edit.component';
import { UserPageComponent } from './admin/user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ProgrammePageComponent } from './admin/programme-page/programme-page.component';
import { ListprogramComponent } from './admin/programme/listprogram/listprogram.component';
import { EditprogramComponent } from './admin/programme/editprogram/editprogram.component';
import { FixboolYNPipe } from './fixbool-yn.pipe';
import { WelcomLoginokComponent } from './home/welcom-loginok/welcom-loginok.component';
import { ProvideParentFormDirective } from './provide-parent-form.directive';
import { GenBootUiComponent } from './generic/bootstrap/gen-boot-ui/gen-boot-ui.component';
import { EditenterpriseEnterpriseComponent } from './baseline/enterprise/editenterprise-enterprise/editenterprise-enterprise.component';
import { BaselineEnterpriseEditenterprise2Component } from './baseline/enterprise/baseline-enterprise-editenterprise2/baseline-enterprise-editenterprise2.component';
import { NumberOnlyDirective } from './generic/bootstrap/gen-boot-ui/number-only.directive';
import { BaselineEntrepreneurPageComponent } from './baseline/entrepreneur/baseline-entrepreneur-page/baseline-entrepreneur-page.component';

import { SearchBaselineEntrepreneurEntrepreneurComponent } from './baseline/entrepreneur/search-baseline-entrepreneur-entrepreneur/search-baseline-entrepreneur-entrepreneur.component';
import { BaselineCooperativePageComponent } from './baseline/cooperative/baseline-cooperative-page/baseline-cooperative-page.component';
import { EditBaselineCooperativeCooperativeComponent } from './baseline/cooperative/edit-baseline-cooperative-cooperative/edit-baseline-cooperative-cooperative.component';
import { SearchBaselineCooperativeCooperativeComponent } from './baseline/cooperative/search-baseline-cooperative-cooperative/search-baseline-cooperative-cooperative.component';
import { BaselineAssociationPageComponent } from './baseline/association/baseline-association-page/baseline-association-page.component';
import { EditBaselineAssociationAssociationComponent } from './baseline/association/edit-baseline-association-association/edit-baseline-association-association.component';
import { SearchBaselineAssociationAssociationComponent } from './baseline/association/search-baseline-association-association/search-baseline-association-association.component';
import { VisitsEntrepreneursPageComponent } from './visits/entrepreneurs/visits-entrepreneurs-page/visits-entrepreneurs-page.component';
import { EditVisitsEntrepreneursEntrepreneursComponent } from './visits/entrepreneurs/edit-visits-entrepreneurs-entrepreneurs/edit-visits-entrepreneurs-entrepreneurs.component';
import { SearchVisitsEntrepreneursEntrepreneursComponent } from './visits/entrepreneurs/search-visits-entrepreneurs-entrepreneurs/search-visits-entrepreneurs-entrepreneurs.component';
import { VisitsEnterprisePageComponent } from './visits/enterprise/visits-enterprise-page/visits-enterprise-page.component';
import { EditVisitsEnterpriseEnterpriseComponent } from './visits/enterprise/edit-visits-enterprise-enterprise/edit-visits-enterprise-enterprise.component';
import { SearchVisitsEnterpriseEnterpriseComponent } from './visits/enterprise/search-visits-enterprise-enterprise/search-visits-enterprise-enterprise.component';
import { VisitsCooperativePageComponent } from './visits/cooperative/visits-cooperative-page/visits-cooperative-page.component';
import { EditVisitsCooperativeCooperativeComponent } from './visits/cooperative/edit-visits-cooperative-cooperative/edit-visits-cooperative-cooperative.component';
import { SearchVisitsCooperativeCooperativeComponent } from './visits/cooperative/search-visits-cooperative-cooperative/search-visits-cooperative-cooperative.component';
import { VisitsAssociationPageComponent } from './visits/association/visits-association-page/visits-association-page.component';
import { EditVisitsAssociationAssociationComponent } from './visits/association/edit-visits-association-association/edit-visits-association-association.component';
import { SearchVisitsAssociationAssociationComponent } from './visits/association/search-visits-association-association/search-visits-association-association.component';
import { ActionplansEnterprisesPageComponent } from './actionplans/enterprises/actionplans-enterprises-page/actionplans-enterprises-page.component';
import { EditActionplansEnterprisesEnterprisesComponent } from './actionplans/enterprises/edit-actionplans-enterprises-enterprises/edit-actionplans-enterprises-enterprises.component';
import { ActionplansCooperativesPageComponent } from './actionplans/cooperatives/actionplans-cooperatives-page/actionplans-cooperatives-page.component';
import { EditActionplansCooperativesCooperativesComponent } from './actionplans/cooperatives/edit-actionplans-cooperatives-cooperatives/edit-actionplans-cooperatives-cooperatives.component';
import { ActionplansAssociationPageComponent } from './actionplans/association/actionplans-association-page/actionplans-association-page.component';
import { EditActionplansAssociationAssociationComponent } from './actionplans/association/edit-actionplans-association-association/edit-actionplans-association-association.component';
import { TrainingEntrepreneursPageComponent } from './training/entrepreneurs/training-entrepreneurs-page/training-entrepreneurs-page.component';
import { EditTrainingEntrepreneursEntrepreneursComponent } from './training/entrepreneurs/edit-training-entrepreneurs-entrepreneurs/edit-training-entrepreneurs-entrepreneurs.component';
import { WorkshopsEntrepreneursPageComponent } from './workshops/entrepreneurs/workshops-entrepreneurs-page/workshops-entrepreneurs-page.component';
import { EditWorkshopsEntrepreneursEntrepreneursComponent } from './workshops/entrepreneurs/edit-workshops-entrepreneurs-entrepreneurs/edit-workshops-entrepreneurs-entrepreneurs.component';
import { SearchWorkshopsEntrepreneursEntrepreneursComponent } from './workshops/entrepreneurs/search-workshops-entrepreneurs-entrepreneurs/search-workshops-entrepreneurs-entrepreneurs.component';
import { EditLoansBaselineEnterpriseComponent } from './baseline/enterprise/loans/edit-loans-baseline-enterprise/edit-loans-baseline-enterprise.component';
import { ListLoansBaselineEnterpriseComponent } from './baseline/enterprise/loans/list-loans-baseline-enterprise/list-loans-baseline-enterprise.component';
import { EditfrmVisitsEnterpriseEnterpriseComponent } from './visits/enterprise/editfrm-visits-enterprise-enterprise/editfrm-visits-enterprise-enterprise.component';
import { EditfrmVisitsCooperativeComponent } from './visits/cooperative/editfrm-visits-cooperative/editfrm-visits-cooperative.component';
import { EditLoansBaselineCooperativeComponent } from './baseline/cooperative/loans/edit-loans-baseline-cooperative/edit-loans-baseline-cooperative.component';
import { ListLoansBaselineCooperativeComponent } from './baseline/cooperative/loans/list-loans-baseline-cooperative/list-loans-baseline-cooperative.component'
import { ComListActionPlanComponent } from './common/actionplan/com-list-action-plan/com-list-action-plan.component';
import { ComListActionPlansActivityComponent } from './common/actionplan/com-list-action-plans-activity/com-list-action-plans-activity.component';
import { ComEditActionPlansActivityComponent } from './common/actionplan/com-edit-action-plans-activity/com-edit-action-plans-activity.component';
import { EditDialogActionplansEnterprisesEnterprisesComponent } from './common/actionplan/edit-dialog-actionplans-enterprises-enterprises/edit-dialog-actionplans-enterprises-enterprises.component';
import { EditDialogActionplansEnterprisesComponent } from './common/actionplan/edit-dialog-actionplans-enterprises/edit-dialog-actionplans-enterprises.component';
import { ComEditActionPlansComponent } from './common/actionplan/com-edit-action-plans/com-edit-action-plans.component';
import { DeleteCheckComponent } from './common/dialog/delete-check/delete-check.component';
import { BaselineCoopEditcoop2Component } from './baseline/coop/baseline-coop-editcoop2/baseline-coop-editcoop2.component';
import { EditcoopComponent } from './baseline/coop/editcoop/editcoop.component';
import { EditcoopCoopComponent } from './baseline/coop/editcoop-coop/editcoop-coop.component';
import { ListcoopComponent } from './baseline/coop/listcoop/listcoop.component';
import { SearchCoopComponent } from './baseline/coop/search-coop/search-coop.component';
import { EditLoansBaselineCoopComponent } from './baseline/coop/loans/edit-loans-baseline-coop/edit-loans-baseline-coop.component';
import { ListLoansBaselineCoopComponent } from './baseline/coop/loans/list-loans-baseline-coop/list-loans-baseline-coop.component'
import { ListMemberBaselineEnterpriseComponent } from './baseline/enterprise/member/list-member-baseline-enterprise/list-member-baseline-enterprise.component';
import { EditMemberBaselineEnterpriseComponent } from './baseline/entrepreneur/edit-member-baseline-enterprise/edit-member-baseline-enterprise.component';
import { ComEditContactComponent } from './common/contact/com-edit-contact/com-edit-contact.component';
import { CardCssFormGroupDirective } from './directive/card-css-form-group.directive';
import { CardHeaderCssFormGroupDirective } from './directive/card-header-css-form-group.directive';
import { ListEntrepreneurComponent } from './common/entrepreneur/list-entrepreneur/list-entrepreneur.component';
import { SearchEntrepreneurComponent } from './common/entrepreneur/search-entrepreneur/search-entrepreneur.component';
import { JobsCreatedComponent } from './report/jobs-created/jobs-created.component';
import { JobsSustainedComponent } from './report/jobs-sustained/jobs-sustained.component';
import { AgeGroupComponent } from './report/age-group/age-group.component';
import { CreatingmorejobsComponent } from './report/creatingmorejobs/creatingmorejobs.component';
import { CompletingTrainingsComponent } from './report/completing-trainings/completing-trainings.component';
import { AgevsRevenueComponent } from './report/agevs-revenue/agevs-revenue.component';
import { EducationvsRevenueComponent } from './report/educationvs-revenue/educationvs-revenue.component';
import { LevelofEducationComponent } from './report/levelof-education/levelof-education.component';
import { HousingComponent } from './report/housing/housing.component';
import { OutstandingTrainingsComponent } from './report/outstanding-trainings/outstanding-trainings.component';
import { MostPopularTrainingComponent } from './report/most-popular-training/most-popular-training.component';
import { OwnerNumberVsEmployeeNumbersComponent } from './report/owner-number-vs-employee-numbers/owner-number-vs-employee-numbers.component';
import { SearchByProvinceComponent } from './report/search-by-province/search-by-province.component';
import { DashboardComponent } from './report/dashboard/dashboard.component';
import { NgbdCarouselConfig } from './carousel/carousel-config/carousel-config.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchTrainingComponent } from './training/entrepreneurs/entrepreneur-training-search/search-training/search-training.component';
import { ReportEntrepreneurSearchComponent } from './report/report-entrepreneur-search/report-entrepreneur-search.component';
import { ReportEnterpriseSearchComponent } from './report/report-enterprise-search/report-enterprise-search.component';
import { EnterpriseRegisterComponent } from './report/enterprise-register/enterprise-register.component';
import { StartupFundsComponent } from './report/startup-funds/startup-funds.component';
import { AssetsComponent } from './report/assets/assets.component';
import { SectorsComponent } from './report/sectors/sectors.component';
import { EnterpriseCountComponent } from './report/enterprise-count/enterprise-count.component';
import { EnterpriseLoansComponent } from './report/enterprise-loans/enterprise-loans.component';
import { EntrepreneurIncomeComponent } from './report/entrepreneur-income/entrepreneur-income.component';
import { EntrepreneurDemographicComponent } from './report/entrepreneur-demographic/entrepreneur-demographic.component';
import { EntrepreneurSupportComponent } from './report/entrepreneur-support/entrepreneur-support.component';
import { EntrepreneurTechnologyComponent } from './report/entrepreneur-technology/entrepreneur-technology.component';
import { EntrepreneurChallengesComponent } from './report/entrepreneur-challenges/entrepreneur-challenges.component'


const interceptor = new ProgressInterceptor();

@NgModule({
  declarations: [    
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    ListenterpriseComponent,
    EditenterpriseComponent,
    SearchEnterpriseComponent,
    DistrictMetroPipe,
    MunicipalityPipe,
    MainPlacePipe,
    WelcomeComponent,
    MenuComponent,
    HomePageComponent,
    ListComponent,
    EditUserComponent,
    UserPageComponent,
    AdminPageComponent,
    ProgrammePageComponent,
    ListprogramComponent,
    EditprogramComponent,
    FixboolYNPipe,
    WelcomLoginokComponent,
    ProvideParentFormDirective,
    GenBootUiComponent,
    EditenterpriseEnterpriseComponent,
    BaselineEnterpriseEditenterprise2Component,
    NumberOnlyDirective,
    BaselineEntrepreneurPageComponent,
    SearchBaselineEntrepreneurEntrepreneurComponent,
    BaselineCooperativePageComponent,
    EditBaselineCooperativeCooperativeComponent,
    SearchBaselineCooperativeCooperativeComponent,
    BaselineAssociationPageComponent,
    EditBaselineAssociationAssociationComponent,
    SearchBaselineAssociationAssociationComponent,
    VisitsEntrepreneursPageComponent,
    EditVisitsEntrepreneursEntrepreneursComponent,
    SearchVisitsEntrepreneursEntrepreneursComponent,
    VisitsEnterprisePageComponent,
    EditVisitsEnterpriseEnterpriseComponent,
    SearchVisitsEnterpriseEnterpriseComponent,
    VisitsCooperativePageComponent,
    EditVisitsCooperativeCooperativeComponent,
    SearchVisitsCooperativeCooperativeComponent,
    VisitsAssociationPageComponent,
    EditVisitsAssociationAssociationComponent,
    SearchVisitsAssociationAssociationComponent,
    ActionplansEnterprisesPageComponent,
    EditActionplansEnterprisesEnterprisesComponent,
    ActionplansCooperativesPageComponent,
    EditActionplansCooperativesCooperativesComponent,
    ActionplansAssociationPageComponent,
    EditActionplansAssociationAssociationComponent,
    TrainingEntrepreneursPageComponent,
    EditTrainingEntrepreneursEntrepreneursComponent,
    WorkshopsEntrepreneursPageComponent,
    EditWorkshopsEntrepreneursEntrepreneursComponent,
    SearchWorkshopsEntrepreneursEntrepreneursComponent,
    EditLoansBaselineEnterpriseComponent,
    ListLoansBaselineEnterpriseComponent,
    EditfrmVisitsEnterpriseEnterpriseComponent,
    EditfrmVisitsCooperativeComponent,
    EditLoansBaselineCooperativeComponent,
    ListLoansBaselineCooperativeComponent,
    ComListActionPlanComponent,
    ComListActionPlansActivityComponent,
    ComEditActionPlansActivityComponent,
    EditDialogActionplansEnterprisesEnterprisesComponent,
    EditDialogActionplansEnterprisesComponent,
    ComEditActionPlansComponent,
    DeleteCheckComponent,
    ProgressComponent,
    EditfrmVisitsEnterpriseEnterpriseComponent,

    BaselineCoopEditcoop2Component,

    EditcoopComponent,

    EditcoopCoopComponent,

    ListcoopComponent,

    SearchCoopComponent,

    EditLoansBaselineCoopComponent,

    ListLoansBaselineCoopComponent,
    ListMemberBaselineEnterpriseComponent,

    EditMemberBaselineEnterpriseComponent,

    ComEditContactComponent,

    CardCssFormGroupDirective,

    CardHeaderCssFormGroupDirective,

    ListEntrepreneurComponent,

    SearchEntrepreneurComponent,

    JobsCreatedComponent,

    JobsSustainedComponent,

    AgeGroupComponent,

    CreatingmorejobsComponent,

    CompletingTrainingsComponent,

    AgevsRevenueComponent,

    EducationvsRevenueComponent,

    LevelofEducationComponent,

    HousingComponent,

    OutstandingTrainingsComponent,

    MostPopularTrainingComponent,

    OwnerNumberVsEmployeeNumbersComponent,

    SearchByProvinceComponent,

    DashboardComponent,

    NgbdCarouselConfig,

    SearchTrainingComponent,

    ReportEntrepreneurSearchComponent,

    ReportEnterpriseSearchComponent,

    EnterpriseRegisterComponent,

    StartupFundsComponent,

    AssetsComponent,

    SectorsComponent,

    EnterpriseCountComponent,

    EnterpriseLoansComponent,

    EntrepreneurIncomeComponent,

    EntrepreneurDemographicComponent,

    EntrepreneurSupportComponent,

    EntrepreneurTechnologyComponent,

    EntrepreneurChallengesComponent
    
  ],
  entryComponents: [EditDialogActionplansEnterprisesEnterprisesComponent,
    EditDialogActionplansEnterprisesComponent,
    DeleteCheckComponent, ListEntrepreneurComponent],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot(), 
    ChartModule ,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatSelectModule, MatSlideToggleModule, MatInputModule, MatTableModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatNativeDateModule, MatDatepickerModule,
    NgxDatatableModule, MatDialogModule,MatAutocompleteModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    RouterModule.forRoot([{
      path: '',
      component: HomePageComponent
    },
    {
      path: 'loginok',
      component: WelcomLoginokComponent
    },
    {
      path: 'baseline/enterprise',
      component: ListenterpriseComponent
    },
    {
      path: 'baseline/enterprise/:Enterprise_ID',
      component: BaselineEnterpriseEditenterprise2Component
    },
    {
      path: 'baseline/cooperative/:Cooperative_ID',
      component: BaselineCoopEditcoop2Component
    },
    {
      path: 'admin',
      component: AdminPageComponent
    },
    {
      path: 'admin/user',
      component: UserPageComponent
    },
    {
      path: 'admin/programme',
      component: ProgrammePageComponent
    },
    {
      path: 'admin/programme/:programmeID',
      component: EditprogramComponent
    },
    {
      path: 'baseline/entrepreneur',
      component: BaselineEntrepreneurPageComponent
    },
    {
      path: 'baseline/entrepreneur/:Entrepreneur_ID',
      component: BaselineEntrepreneurPageComponent
    },
    {
      path: 'baseline/cooperative',
      //component:BaselineCooperativePageComponent
      component: ListcoopComponent

    },
    {
      path: 'baseline/association',
      component: BaselineAssociationPageComponent
    },
    {
      path: 'baseline/association/:Association_ID',
      component: EditBaselineAssociationAssociationComponent
    },
    {
      path: 'baseline/enterprise',
      component: ListenterpriseComponent
    },
    {
      path: 'visits/entrepreneurs',
      component: VisitsEntrepreneursPageComponent
    },
    {
      path: 'visits/enterprise',
      component: VisitsEnterprisePageComponent
    },
    {
      path: 'visits/enterprise/:Enterprise_ID',
      component: EditVisitsEnterpriseEnterpriseComponent
    },
    {
      path: 'visits/cooperative',
      component: VisitsCooperativePageComponent
    },
    {
      path: 'visits/cooperative/:Cooperative_ID',
      component: EditVisitsCooperativeCooperativeComponent
    },
    {
      path: 'visits/cooperative/:Cooperative_ID/:Cooperative_Visit_ID',
      component: EditfrmVisitsCooperativeComponent
    },
    {
      path: 'visits/association',
      component: VisitsAssociationPageComponent
    },
    {
      path: 'actionplans/enterprises',
      component: ActionplansEnterprisesPageComponent
    },
    {
      path: 'actionplans/enterprises/:Enterprise_ID',
      component: EditActionplansEnterprisesEnterprisesComponent
    },
    {
      path: 'actionplans/cooperatives',
      component: ActionplansCooperativesPageComponent
    },
    {
      path: 'actionplans/cooperatives/:Cooperative_ID',
      component: EditActionplansCooperativesCooperativesComponent
    },
    {
      path: 'actionplans/association',
      component: ActionplansAssociationPageComponent
    },
    {
      path: 'actionplans/association/:Association_ID',
      component: EditActionplansAssociationAssociationComponent
    },
    {
      path: 'training/entrepreneurs',
      component: TrainingEntrepreneursPageComponent
    },
    {
      path: 'workshops/entrepreneurs',
      component: WorkshopsEntrepreneursPageComponent
    },
    {
      path: 'report/dashboard',
      component: DashboardComponent
    },
    {
      path: 'report/AgeGroup',
      component: AgeGroupComponent
    },
    {
      path: 'report/EntrepreneurIncome',
      component: EntrepreneurIncomeComponent
    },
    {
      path: 'report/BasicDemographic',
      component: EntrepreneurDemographicComponent
    },
    {
      path: 'report/SupportReceived',
      component: EntrepreneurSupportComponent
    },
    {
      path: 'report/Technology',
      component: EntrepreneurTechnologyComponent
    },
    {
      path: 'report/Challenges',
      component: EntrepreneurChallengesComponent
    },
    {
      path: 'report/JobsCreated',
      component: JobsCreatedComponent
    },
    {
      path: 'report/JobsSustained',
      component: JobsSustainedComponent
    },
    {
      path: 'report/Creatingmorejobs',
      component: CreatingmorejobsComponent
    },
    {
      path: 'report/EnterpriseRegister',
      component: EnterpriseRegisterComponent
    },
    
    {
      path: 'report/EnterpriseStartupFunds',
      component: StartupFundsComponent
    },
    {
      path: 'report/EnterpriseAssets',
      component: AssetsComponent
    },
    {
      path: 'report/EnterpriseSectors',
      component: SectorsComponent
    },
    {
      path: 'report/EnterpriseCount',
      component: EnterpriseCountComponent
    },
    {
      path: 'report/EnterpriseLoans',
      component: EnterpriseLoansComponent
    },
    {
      path: 'report/CompletingTrainings',
      component: CompletingTrainingsComponent
    },
    {
      path: 'report/AgevsRevenue',
      component: AgevsRevenueComponent
    },
    {
      path: 'report/EducationvsRevenue',
      component: EducationvsRevenueComponent
    },
    {
      path: 'report/LevelofEducation',
      component: LevelofEducationComponent
    },
    {
      path: 'report/Housing',
      component: HousingComponent
    },
    {
      path: 'report/OutstandingTrainings',
      component: OutstandingTrainingsComponent
    },
    {
      path: 'report/MostPopularTraining',
      component: MostPopularTrainingComponent
    },
    {
      path: 'report/OwnerNumberVsEmployeeNumbers',
      component: OwnerNumberVsEmployeeNumbersComponent
    }
    ])
  ],
  providers: [
    { provide: ProgressInterceptor, useValue: interceptor },
    { provide: HTTP_INTERCEPTORS, useValue: interceptor, multi: true },
    EwepserverService, GlobalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
