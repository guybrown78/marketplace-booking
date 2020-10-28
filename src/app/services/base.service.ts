import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
//
import { AppError } from '../common/errors/app.error';
import { NotFoundError } from '../common/errors/not-found-error';
import { BadInput } from '../common/errors/bad-input';
//
import { UrlDataService } from './url-data.service'

import { _mpConfigBaseEndpoint } from '../../config'
@Injectable({
  providedIn: 'root'
})
export class BaseService {

	
	private _baseEndpoint: string = _mpConfigBaseEndpoint;
	constructor(
		public http: HttpClient,
		public urlDataService:UrlDataService
	) { }
	
	public requestOptions(){
		const headerDict = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Cache-Control': 'no-store',
			'Access-Control-Allow-Origin':'*'
		};
		return{
			headers: new HttpHeaders(headerDict), 
		}
	}

	// https:// serica .uat.ontransform.com/tms/api/bookingform/
	public getDataURL(url){
		return `https://${this.urlDataService.tenantApiPrefix}${this.baseEndpoint}/${url}`;
	}


	// GETTERS & SETTERS

	get baseEndpoint(): string {
		return this._baseEndpoint;
	}


	public handleError(error: HttpErrorResponse) {
		if(error.status === 404)
			return throwError(new NotFoundError());
		if(error.status === 400)
			return throwError(new BadInput(error));
		return throwError(new AppError(error, true));
	};

}
