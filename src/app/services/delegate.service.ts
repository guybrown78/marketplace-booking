import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BaseService } from './base.service';

import { GetUsersFullNamePipe } from '../common/pipes/get-users-full-name.pipe';

import { DelegatesModel } from '../common/models/delegates.model';
import { DelegateModel } from '../common/models/delegate.model';

@Injectable({
  providedIn: 'root'
})
export class DelegateService extends BaseService{

	private _delegates:DelegateModel[]  = [];
	private _allDelegatesLoaded: boolean = false;
	//
	constructor(
		http: HttpClient,
		private getUsersFullName: GetUsersFullNamePipe,
	) { 
		super(http)
	}
	
	public getFilteredDelegated(str:string):DelegateModel[]{
		return this._delegates.filter(
			u => this.getUsersFullName.transform(u).toLowerCase().includes(str)
		);
	}

	// Get All Delegates
	getDelegates() {
		// Are delegates loaded?
		if(this._delegates.length && this.allDelegatesLoaded){
			return of(this._delegates);
		}
		// GET ...api/api-delegates/db
		return this.http
			.get(this.getDataURL(`api-delegates/db`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}
	//
	getDelegatesFromId(id:string) {
		// GET ...api/api-delegates/db
		return this.http
			.get(this.getDataURL(`api-delegates/results/${id}`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}
	// public getStaticJSON():any{
	// 	let id = 63120;
	// 	const roles = ["Rigger", "Welding Inspector", "Drilling Supervisor", "Platform Safety Officer", "Scaffolding engineer", "First Aider", "Pipe Specialist", "Engineer","Pipe Fitter"]
	// 	const newModels = userData.map((u,i) => {
	// 		id++
	// 		const obj = {
	// 			"id":String(id),
	// 			"firstName":String(u.firstName),
	// 			"lastName":String(u.lastName),
	// 			"role":roles[Math.floor(Math.random() * 10)]
	// 		}
	// 		return obj;
	// 	})
	// 	return { "results":JSON.stringify(newModels) };
	// }

	// GETTERS AND SETTERS
	get delegates(): DelegateModel[] {
		return this._delegates;
	}
	set delegates(items:DelegateModel[]) {
		this._delegates = items;
	}

	get allDelegatesLoaded():boolean{
		return this._allDelegatesLoaded;
	}
	set allDelegatesLoaded(value:boolean){
		this._allDelegatesLoaded = value;
	}
}


