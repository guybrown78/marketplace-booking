import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';


import { AppError } from '../common/errors/app.error';


import { 
	throwError, 
	BehaviorSubject, 
	Observable, 
	Subject, 
	of
} from 'rxjs';


import { TennantModel, TennantsModel } from '../common/models/tennant.model';

@Injectable({
  providedIn: 'root'
})
export class TennantService extends BaseService {

	private _tennant:TennantModel;

  constructor(
		http: HttpClient,
	) { 
		super(http)
	}

	// Get All Tennants
	getTennants() {
		// GET ...api/api-tennants/db
		return this.http
			.get(this.getDataURL(`api-tennants/db`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}

	// Get Single tennant on id
	getTennant(id:string) {
		// GET ...api/api-tennants/db
		return this.http
			.get(this.getDataURL(`api-tennants/results/${id}`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}

	// GETTERS AND SETTERS
	get tennant(): TennantModel {
		return this._tennant;
	}
	set tennant(item:TennantModel) {
		this._tennant = item;
	}
}
