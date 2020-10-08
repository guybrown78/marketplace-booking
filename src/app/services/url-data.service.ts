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
	
	// ?entrydata={"tennantId":"679e8ced-6c32-441d-9fdc-d806180e27f7"}
	// ?entrydata=%7B"tennantId":"679e8ced-6c32-441d-9fdc-d806180e27f7"%7D

	// ?entrydata={"tennantId":"679e8ced-6c32-441d-9fdc-d806180e27f7","delegateIds":["63122"]}
	// ?entrydata=%7B%22tennantId%22:%22679e8ced-6c32-441d-9fdc-d806180e27f7%22,%22delegateIds%22:%5B%2263122%22%5D%7D


	setUrlQueryData(params:any){
		console.log("params")
		console.log(params)
		if(!isObjectEmpty(params)){
			console.log("params.entrydata")
			console.log(params.entrydata)
			console.log(!isObjectEmpty(params.entrydata));
			if(params.entrydata && !isObjectEmpty(params.entrydata)){
				console.log("HEEEEEEEER")
				const ed = JSON.parse(params.entrydata);
				console.log("---------")
				console.log(ed)
				console.log(ed.delegateIds);
				console.log("---------")
				this.entryData = {
					tennantId:ed.tennantId || "",
					delegateIds: ed.delegateIds ? ed.delegateIds.map(d => String(d)) : []
				}
			}
			if(params.returndata && !isObjectEmpty(params.returndata)){
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
