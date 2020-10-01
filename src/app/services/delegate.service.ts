import { Injectable } from '@angular/core';
import { userData } from '../data/userData'

@Injectable({
  providedIn: 'root'
})
export class DelegateService {

	constructor() { }
	
	public getFilteredDelegated(str:string):any[]{
		const updatedData = userData.filter(
			u => u.firstName.toLowerCase().includes(str) || u.lastName.toLowerCase().includes(str)
		);
		
		return updatedData.map(u => `${u.firstName} ${u.lastName}`)
	}
}
