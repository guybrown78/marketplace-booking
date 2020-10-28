import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { UrlDataService } from './url-data.service'



import { TenantModel, TenantsModel } from '../common/models/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends BaseService {

	private _tenant:TenantModel;

  constructor(
		http: HttpClient,
		urlDataService:UrlDataService
	) { 
		super(http, urlDataService)
	}

	// Get tenant details
	getTenant() {
		return this.http
			.get(this.getDataURL(`tenant`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}
	// test tenant - used when scraping the tenant from the host url, it looks for the string between https:// and the first '.' - that string is used to compose the endpoint of this test service call
	getTestTenant(tenant:string) {
		return this.http
			.get(`https://${tenant}${this.baseEndpoint}/tenant`, { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}
	
	// GETTERS AND SETTERS
	get tenant(): TenantModel {
		return this._tenant;
	}
	set tenant(item:TenantModel) {
		this._tenant = item;
	}
}
