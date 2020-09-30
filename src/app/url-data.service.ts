import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlDataService {

	private _entryData: any = {
		name: "Default name",
		course: "",
		location: ""
	};
	private _returnData: any = {
		"type": "url",
		"url": "https://www.neutronvr.com/default-url"
	};

	constructor() { }
	
	get entryData(): any {
		return this._entryData;
	}
	set entryData(data:any) {
		if(data){
			console.log("set entryData")
			this._entryData = { ...data };
		}
	}

	get returnData(): any {
		return this._returnData;
	}
	set returnData(data:any) {
		if(data){
			console.log("set returnData")
			this._returnData = { ...data };
		}
	}
}
