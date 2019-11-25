import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap';



import { AppComponent } from './app.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Routes, RouterModule } from '@angular/router';

import {CustomDevExtremeModule} from './devExtreme.Module';

import {LoginComponent} from './login/login.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {LayoutComponent} from './layout/layout.component';
import {DailyOperationReportsComponent} from './components/dailyOperationReports/dailyOperationReports.component';
import {DeletedItemsReportComponent} from './components/deletedItemsReport/deletedItemsReport.component';
import {MenuItemSaleReportComponent} from './components/menuItemSaleReport/menuItemSaleReport.component';
import {RequestFormComponent } from './components/requestForm/requestForm.component';
import {FolioDetailReportComponent} from  './components/folioDetailReport/folioDetailReport.component';
import {DiscountSummaryReportComponent} from './components/discountSummaryReport/discountSummaryReport.component';
import {DiscountDetailReportComponent} from './components/discountDetailReport/discountDetailReport.component';


import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './shared/userServices/auth-guard.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/userServices/token.interceptor';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  {
    path: 'Layout', component: LayoutComponent, canActivate: [AuthGuardService],
    children:
    [
      { path: 'SideBar', component: SidebarComponent}, 
      { path: 'DailyReportSummary', component: DailyOperationReportsComponent},
      { path: 'DeletedItemReport', component: DeletedItemsReportComponent},
      { path: 'MenuItemSaleReport', component: MenuItemSaleReportComponent},
      { path: 'RequestForm', component: RequestFormComponent},
      { path: 'FolioDetail', component: FolioDetailReportComponent},
      { path: 'DiscountSummaryReport', component: DiscountSummaryReportComponent},
      { path: 'DiscountDetailReport', component: DiscountDetailReportComponent},
      { path: '', redirectTo: 'DailyReportSummary', pathMatch: 'full' },
    ]
  },  
]

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LayoutComponent,
    LoginComponent,
    DailyOperationReportsComponent,
    DeletedItemsReportComponent,
    RequestFormComponent,
    FolioDetailReportComponent,
    MenuItemSaleReportComponent,
    DiscountSummaryReportComponent,
    DiscountDetailReportComponent
        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CustomDevExtremeModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [ {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,    
  },
  AuthGuardService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
],
schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  bootstrap: [AppComponent],

})
export class AppModule { }
