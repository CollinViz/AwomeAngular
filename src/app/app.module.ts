import { BrowserModule } from '@angular/platform-browser';
import { NgModule,Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal'; 
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatButtonModule, MatCheckboxModule,MatSelectModule,MatSlideToggleModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './home/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ListenterpriseComponent } from './listenterprise/listenterprise.component';
import { EditenterpriseComponent } from './editenterprise/editenterprise.component';
import {EwepserverService} from './ewepserver.service';
import { SearchEnterpriseComponent } from './search-enterprise/search-enterprise.component';
import { DistrictMetroPipe } from './district-metro.pipe';
import { MunicipalityPipe } from './municipality.pipe';
import { MainPlacePipe } from './main-place.pipe';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { MenuComponent } from './home/menu/menu.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ListComponent } from './admin/user/list/list.component';
import { EditComponent } from './admin/user/edit/edit.component';
import { UserPageComponent } from './admin/user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ProgrammePageComponent } from './admin/programme-page/programme-page.component';
import { ListprogramComponent } from './admin/programme/listprogram/listprogram.component';
import { EditprogramComponent } from './admin/programme/editprogram/editprogram.component'

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
    EditComponent,
    UserPageComponent,
    AdminPageComponent,
    ProgrammePageComponent,
    ListprogramComponent,
    EditprogramComponent 
  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule, 
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatSelectModule,MatSlideToggleModule,
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
      component: EditenterpriseComponent
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
    }])
  ],
  providers: [EwepserverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
