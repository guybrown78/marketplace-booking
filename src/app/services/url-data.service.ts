import { Injectable } from '@angular/core';
import { UrlQueryData, EntryQueryData, ResultsQueryData } from '../common/models/url-data.model'

import { isObjectEmpty } from '../common/utils'

@Injectable({
  providedIn: 'root'
})
export class UrlDataService {

	private _entryData:EntryQueryData = {
		delegateIds:[],
		tennantId: "",
	};
	private _returnData: ResultsQueryData = {
		type: "url",
		url: "https://www.neutronvr.com/default-url"
	};

	constructor() { }
	
	setUrlQueryData(params:any){
		if(!isObjectEmpty(params)){
			if(!isObjectEmpty(params.entrydata)){
				this.entryData = JSON.parse(params.entrydata) as EntryQueryData;
			}
			if(!isObjectEmpty(params.returndata)){
				this.returnData = JSON.parse(params.returndata)
			}
		}
	}

	get entryData(): EntryQueryData {
		return this._entryData;
	}
	set entryData(data: EntryQueryData) {
		if(data){
			console.log("set entryData")
			this._entryData = { ...data };
		}
	}

	get returnData(): any {
		return this._returnData;
	}
	set returnData(data: any) {
		if(data){
			console.log("set returnData")
			this._returnData = { ...data };
		}
	}
}
