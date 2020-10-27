import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseService } from './services/base.service'
import { UrlDataService } from './services/url-data.service';
import { TenantService } from './services/tenant.service';
import { TenantModel, TenantsModel } from './common/models/tenant.model'
import { AppError } from './common/errors/app.error'
import { _mpConfigTenant } from '../config'
import { skip } from 'rxjs/operators';
// import { skip } from 'rxjs/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'marketplace-booking';
	error:string = null;
	inited:boolean = false;
  constructor(
		private router: Router,
		private route: ActivatedRoute,
		private baseService: BaseService,
		private urlService: UrlDataService,
		private tenantService: TenantService
	) { }

	ngOnInit(): void {
		this.route.queryParams.pipe(skip(1)).subscribe(params => {
			this.urlService.setUrlQueryData(params);
			console.log(this.urlService.entryData)
			//
			// All the calls from this point on are tenant based. we need to get the tenant apiPrfix from somewhere.
			// 1 try the entryData
			// this is the default way to pass the tenant in. if a tenant is passed here it will use this tenant apiPrefix throughout the app and not try any other methods.
			let tenantApiPrefix = this.urlService.entryData.tenant;
			if(!tenantApiPrefix){
				//
				// 2 get it from the url
				// 2-a read the app's host url and assume the tenant api prefix is situated between the https:// and the first .[fullstop]
				tenantApiPrefix = this.urlService.getTenantFromURL();
				console.log("tenantApiPrefix from URL ", tenantApiPrefix)
				// 2-b check that the parsed tennnt from the url returns back data!
				this.tenantService.getTestTenant(tenantApiPrefix)
				.subscribe((tenants:TenantsModel) => {
					if(tenants.results){
						// tenant call works, so ok to use
						this.setTenant(tenantApiPrefix)
					}
				}, (error: AppError) => {
					// 3 get it from the config, last fall back
					tenantApiPrefix = _mpConfigTenant;
					this.setTenant(_mpConfigTenant)
				});
				//
			}else{
				this.setTenant(tenantApiPrefix)
			}
		});
	}
	
	setTenant(tenantApiPrefix){
		// set the tenantApiPrefix in the baseService for the whole of the application
		this.urlService.tenantApiPrefix = tenantApiPrefix
		this.tenantService.getTenant()
		.subscribe((tenants:TenantsModel) => {
			this.tenantService.tenant = tenants.results[0];
			this.inited = true;
		}, (error: AppError) => {
			this.error = "Sorry, something went wrong loading the tenant";
			this.inited = true;
		});
	}

}
