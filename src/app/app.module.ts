import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_GB } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
// add Transform Angular Core materials
import { TfNgCoreModule } from 'tf-ng-core';
//
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
//
import { HeaderComponent } from './header/header.component';
import { SearchMarketplaceComponent } from './search-marketplace/search-marketplace.component';
import { SearchResultsComponent } from './search-results/search-results.component';


import { UrlDataService } from './services/url-data.service';
import { TennantService } from './services/tennant.service';
import { CourseService } from './services/course.service';

import { ScullyLibModule } from '@scullyio/ng-lib';
import { SearchFiltersComponent } from './search-filters/search-filters.component';

// PIPES
import { GetUsersFullNamePipe } from './common/pipes/get-users-full-name.pipe';
import { GetUsersTennantJobRolePipe } from './common/pipes/get-users-tennant-job-role.pipe';
import { BookCourseComponent } from './book-course/book-course.component';
import { ScheduleItemComponent } from './search-results/schedule-item/schedule-item.component';
import { SupplierComponent } from './search-results/supplier/supplier.component';
import { ColumnTitleComponent } from './search-results/column-title/column-title.component';
import { ScheduleCourseSupplierItemComponent } from './search-results/schedule-course-supplier-item/schedule-course-supplier-item.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchMarketplaceComponent,
    SearchResultsComponent,
    SearchFiltersComponent,
    GetUsersFullNamePipe,
    GetUsersTennantJobRolePipe,
    BookCourseComponent,
    ScheduleItemComponent,
    SupplierComponent,
    ColumnTitleComponent,
    ScheduleCourseSupplierItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
    HttpClientModule,
		BrowserAnimationsModule,
		TfNgCoreModule,
		NzBreadCrumbModule,
		NzDividerModule,
		NzIconModule,
		NzFormModule,
		NzInputModule,
		NzAutocompleteModule,
		NzDatePickerModule,
		NzSelectModule,
		NzButtonModule,
		NzDropDownModule,
		NzTableModule,
		NzTabsModule,
		NzToolTipModule,
		ScullyLibModule,
  ],
  providers: [
		{ provide: NZ_I18N, useValue: en_GB }, 
		UrlDataService,
		TennantService,
		CourseService,
		GetUsersFullNamePipe,
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
