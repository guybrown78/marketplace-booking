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
//
import { HeaderComponent } from './header/header.component';
import { SearchMarketplaceComponent } from './search-marketplace/search-marketplace.component';
import { SearchResultsComponent } from './search-results/search-results.component';


import { UrlDataService } from './url-data.service';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { SearchFiltersComponent } from './search-filters/search-filters.component'
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchMarketplaceComponent,
    SearchResultsComponent,
    SearchFiltersComponent
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
		ScullyLibModule,
  ],
  providers: [
		{ provide: NZ_I18N, useValue: en_GB }, 
		UrlDataService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
