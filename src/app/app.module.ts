import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Pipe, PipeTransform } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal'; 

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatRadioModule,MatButtonModule,MatProgressSpinnerModule, MatCheckboxModule,MatSelectModule,MatSlideToggleModule,MatProgressBarModule,MatDatepickerModule,MatNativeDateModule,MatInputModule,MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './home/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ListenterpriseComponent } from './baseline/enterprise/listenterprise/listenterprise.component';
import { EditenterpriseComponent } from './baseline/enterprise/editenterprise/editenterprise.component';
import {EwepserverService} from './ewepserver.service';
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
import { EditBaselineEntrepreneurEntrepreneurComponent } from './baseline/entrepreneur/edit-baseline-entrepreneur-entrepreneur/edit-baseline-entrepreneur-entrepreneur.component';
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
import { SearchActionplansEnterprisesEnterprisesComponent } from './actionplans/enterprises/search-actionplans-enterprises-enterprises/search-actionplans-enterprises-enterprises.component';
import { ActionplansCooperativesPageComponent } from './actionplans/cooperatives/actionplans-cooperatives-page/actionplans-cooperatives-page.component';
import { EditActionplansCooperativesCooperativesComponent } from './actionplans/cooperatives/edit-actionplans-cooperatives-cooperatives/edit-actionplans-cooperatives-cooperatives.component';
import { SearchActionplansCooperativesCooperativesComponent } from './actionplans/cooperatives/search-actionplans-cooperatives-cooperatives/search-actionplans-cooperatives-cooperatives.component';
import { ActionplansAssociationPageComponent } from './actionplans/association/actionplans-association-page/actionplans-association-page.component';
import { EditActionplansAssociationAssociationComponent } from './actionplans/association/edit-actionplans-association-association/edit-actionplans-association-association.component';
import { SearchActionplansAssociationAssociationComponent } from './actionplans/association/search-actionplans-association-association/search-actionplans-association-association.component';
import { TrainingEntrepreneursPageComponent } from './training/entrepreneurs/training-entrepreneurs-page/training-entrepreneurs-page.component';
import { EditTrainingEntrepreneursEntrepreneursComponent } from './training/entrepreneurs/edit-training-entrepreneurs-entrepreneurs/edit-training-entrepreneurs-entrepreneurs.component';
import { SearchTrainingEntrepreneursEntrepreneursComponent } from './training/entrepreneurs/search-training-entrepreneurs-entrepreneurs/search-training-entrepreneurs-entrepreneurs.component';
import { WorkshopsEntrepreneursPageComponent } from './workshops/entrepreneurs/workshops-entrepreneurs-page/workshops-entrepreneurs-page.component';
import { EditWorkshopsEntrepreneursEntrepreneursComponent } from './workshops/entrepreneurs/edit-workshops-entrepreneurs-entrepreneurs/edit-workshops-entrepreneurs-entrepreneurs.component';
import { SearchWorkshopsEntrepreneursEntrepreneursComponent } from './workshops/entrepreneurs/search-workshops-entrepreneurs-entrepreneurs/search-workshops-entrepreneurs-entrepreneurs.component';
import { EditLoansBaselineEnterpriseComponent } from './baseline/enterprise/loans/edit-loans-baseline-enterprise/edit-loans-baseline-enterprise.component';
import { ListLoansBaselineEnterpriseComponent } from './baseline/enterprise/loans/list-loans-baseline-enterprise/list-loans-baseline-enterprise.component';
import { EditfrmVisitsEnterpriseEnterpriseComponent } from './visits/enterprise/editfrm-visits-enterprise-enterprise/editfrm-visits-enterprise-enterprise.component'

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
    EditBaselineEntrepreneurEntrepreneurComponent,
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
    SearchActionplansEnterprisesEnterprisesComponent,
    ActionplansCooperativesPageComponent,
    EditActionplansCooperativesCooperativesComponent,
    SearchActionplansCooperativesCooperativesComponent,
    ActionplansAssociationPageComponent,
    EditActionplansAssociationAssociationComponent,
    SearchActionplansAssociationAssociationComponent,
    TrainingEntrepreneursPageComponent,
    EditTrainingEntrepreneursEntrepreneursComponent,
    SearchTrainingEntrepreneursEntrepreneursComponent,
    WorkshopsEntrepreneursPageComponent,
    EditWorkshopsEntrepreneursEntrepreneursComponent,
    SearchWorkshopsEntrepreneursEntrepreneursComponent,
    EditLoansBaselineEnterpriseComponent,
    ListLoansBaselineEnterpriseComponent,
    EditfrmVisitsEnterpriseEnterpriseComponent 
  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatSelectModule,MatSlideToggleModule, MatInputModule,MatTableModule,   
    MatProgressBarModule,MatProgressSpinnerModule,MatRadioModule,MatNativeDateModule,MatDatepickerModule,
    NgxDatatableModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    RouterModule.forRoot([{
      path: '',
      component: HomePageComponent
    },
    { 
      path:'enterprise',
      component:ListenterpriseComponent
    },
    {
      path: 'enterprise/:Enterprise_ID',
      component: BaselineEnterpriseEditenterprise2Component
    },
    { 
      path:'admin',
      component:AdminPageComponent
    },
    { 
      path:'admin/user',
      component:UserPageComponent
    },
    { 
      path:'admin/programme',
      component:ProgrammePageComponent
    },
    { 
      path:'admin/programme/:programmeID',
      component:EditprogramComponent
    },
    { 
      path:'baseline/entrepreneur',
      component:BaselineEntrepreneurPageComponent
    },
    { 
      path:'baseline/cooperative',
      component:BaselineCooperativePageComponent
    },
    { 
      path:'baseline/association',
      component:BaselineAssociationPageComponent
    },
    { 
      path:'visits/entrepreneurs',
      component:VisitsEntrepreneursPageComponent
    },
    { 
      path:'visits/enterprise',
      component:VisitsEnterprisePageComponent
    },
    { 
      path:'visits/enterprise/:Enterprise_ID',
      component:EditVisitsEnterpriseEnterpriseComponent
    },
    { 
      path:'visits/cooperative',
      component:VisitsCooperativePageComponent
    },
    { 
      path:'visits/association',
      component:VisitsAssociationPageComponent
    },
    { 
      path:'actionplans/enterprises',
      component:ActionplansEnterprisesPageComponent
    },
    { 
      path:'actionplans/cooperatives',
      component:ActionplansCooperativesPageComponent
    },
    { 
      path:'actionplans/association',
      component:ActionplansAssociationPageComponent
    },
    { 
      path:'training/entrepreneurs',
      component:TrainingEntrepreneursPageComponent
    },
    { 
      path:'workshops/entrepreneurs',
      component:WorkshopsEntrepreneursPageComponent
    }
  ])
  ],
  providers: [EwepserverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
