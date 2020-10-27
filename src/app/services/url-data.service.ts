import { Injectable } from '@angular/core';
import { UrlQueryData, EntryQueryData, ResultsQueryData } from '../common/models/url-data.model'

import { isObjectEmpty } from '../common/utils'

@Injectable({
  providedIn: 'root'
})
export class UrlDataService {
	private _tenantApiPrefix: string;
	private _entryData:EntryQueryData = {
		delegateIds:[],
		tenantId: "",
		tenant: null,
	};
	private _returnData: ResultsQueryData = {
		type: "url",
		url: "https://www.neutronvr.com/default-url"
	};

	constructor() { }
	
	// ?entrydata={"tenantId":"679e8ced-6c32-441d-9fdc-d806180e27f7"}
	// ?entrydata=%7B"tenantId":"679e8ced-6c32-441d-9fdc-d806180e27f7"%7D

	// ?entrydata={"tenantId":"679e8ced-6c32-441d-9fdc-d806180e27f7","delegateIds":["63122"]}
	// ?entrydata=%7B%22tenantId%22:%22679e8ced-6c32-441d-9fdc-d806180e27f7%22,%22delegateIds%22:%5B%2263122%22%5D%7D


	setUrlQueryData(params:any){
		if(!isObjectEmpty(params)){
			if(params.entrydata && !isObjectEmpty(params.entrydata)){
				const ed = JSON.parse(params.entrydata);
				this.entryData = {
					tenantId:ed.tenantId || "",
					tenant:ed.tenant || null,
					delegateIds: ed.delegateIds ? ed.delegateIds.map(d => String(d)) : []
				}
			}
			if(params.returndata && !isObjectEmpty(params.returndata)){
				this.returnData = JSON.parse(params.returndata)
			}
		}
	}

	getTenantFromURL():string{
		let url: string = window.location.origin;
		console.log("getTenantFromURL")
		console.log(url);
		if(url.startsWith("http://localhost")){
			return null
		}
		url = url.replace(/(^\w+:|^)\/\//, '');
		console.log("removed protocalls", url);
		return url.split(".")[0];
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

	get tenantApiPrefix(): string {
		return this._tenantApiPrefix;
	}
	set tenantApiPrefix(value:string){
		this._tenantApiPrefix = value;
	}

}
