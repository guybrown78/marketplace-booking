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
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
//
import { HeaderComponent } from './header/header.component';
import { SearchMarketplaceComponent } from './search-marketplace/search-marketplace.component';
import { SearchResultsComponent } from './search-results/search-results.component';


import { UrlDataService } from './services/url-data.service';
import { TennantService } from './services/tennant.service';
import { CourseService } from './services/course.service';
import { SaveCourseService } from './services/save-course.service';

import { ScullyLibModule } from '@scullyio/ng-lib';
import { SearchFiltersComponent } from './search-filters/search-filters.component';

// PIPES
import { GetUsersFullNamePipe } from './common/pipes/get-users-full-name.pipe';
import { GetUsersTennantJobRolePipe } from './common/pipes/get-users-tennant-job-role.pipe';
import { BookCourseComponent } from './book-course/book-course.component';
import { ScheduleItemComponent } from './search-results/schedule-item/schedule-item.component';
import { SupplierComponent } from './search-results/supplier/supplier.component';
import { ColumnTitleComponent } from './common/components/column-title/column-title.component';
import { ScheduleCourseSupplierItemComponent } from './search-results/schedule-course-supplier-item/schedule-course-supplier-item.component';
import { GetNumberLabelPipe } from './common/pipes/get-number-label.pipe';
import { GetDisplayDatePipe } from './common/pipes/get-display-date.pipe';
import { GetCoursePricePipe } from './common/pipes/get-course-price.pipe';
import { GetCourseTaxPipe } from './common/pipes/get-course-tax.pipe';
import { GetCourseDurationPipe } from './common/pipes/get-course-duration.pipe';
import { GetLocationsPipe } from './common/pipes/get-locations.pipe';
import { AddDelegatesComponent } from './add-delegates/add-delegates.component';
import { HeaderTitleComponent } from './common/components/header-title/header-title.component';
import { SelectedCourseItemComponent } from './add-delegates/selected-course-item/selected-course-item.component';
import { GetPluralWordPipe } from './common/pipes/get-plural-word.pipe';
import { DelegateCourseItemComponent } from './book-course/delegate-course-item/delegate-course-item.component';

import { GetDisplayPricePipe } from './common/pipes/get-display-price.pipe';
import { AdditionalNotesComponent } from './book-course/additional-notes/additional-notes.component';


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
    GetNumberLabelPipe,
    GetDisplayDatePipe,
    GetCoursePricePipe,
    GetCourseTaxPipe,
    GetCourseDurationPipe,
    GetLocationsPipe,
    AddDelegatesComponent,
    HeaderTitleComponent,
    SelectedCourseItemComponent,
    GetPluralWordPipe,
    DelegateCourseItemComponent,
    GetDisplayPricePipe,
    AdditionalNotesComponent,
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
		NzCollapseModule,
		ScullyLibModule,
  ],
  providers: [
		{ provide: NZ_I18N, useValue: en_GB }, 
		UrlDataService,
		TennantService,
		CourseService,
		SaveCourseService,
		GetUsersFullNamePipe,
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
