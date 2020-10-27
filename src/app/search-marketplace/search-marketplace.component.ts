import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlDataService } from '../services/url-data.service';
import { TenantService } from '../services/tenant.service';
import { TenantModel, TenantsModel } from '../common/models/tenant.model'
import { AppError } from '../common/errors/app.error'
import { _mpConfigTenant } from '../../config'
@Component({
  selector: 'app-search-marketplace',
  templateUrl: './search-marketplace.component.html',
  styleUrls: ['./search-marketplace.component.css']
})
export class SearchMarketplaceComponent implements OnInit {

	error:string = null;
	inited:boolean = true;
  constructor(
		private router: Router,
		private route: ActivatedRoute,
		private urlService: UrlDataService,
		private tenantService: TenantService
	) { }

  ngOnInit(): void {
	}
	
	// fetchTenant(tenantApiPrefix){
	// 	// set the tenantApiPrefix in the baseService for the whole of the application
	// 	this.tenantService.tenantApiPrefix = tenantApiPrefix;
	// 	this.tenantService.getTenant(tenantApiPrefix)
	// 	.subscribe((tenant:TenantModel) => {
	// 		this.tenantService.tenant = tenant;
	// 		this.inited = true;
	// 	}, (error: AppError) => {
	// 		this.error = "Sorry, something went wrong loading the tenant";
	// 		this.inited = true;
	// 	});
	// }

}
