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

	getTenantDataURL(url){
		return `https://transform${this.baseEndpoint}/${url}`;
	}



	// Get Single tenant on id
	getTenant() {
		// GET ...api/api-tenants/db
		return this.http
			.get(this.getDataURL(`tenant`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}
	// Get Single tenant on id
	getTestTenant(tenant:string) {
		// GET ...api/api-tenants/db
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
