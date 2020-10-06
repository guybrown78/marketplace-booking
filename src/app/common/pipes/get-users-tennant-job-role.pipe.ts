import { Pipe, PipeTransform } from '@angular/core';
import { DelegateModel } from '../models/delegate.model';
import { TennantModel } from '../models/tennant.model';

@Pipe({
	name: 'getUsersTennantJobRole',
	pure:true
})
export class GetUsersTennantJobRolePipe implements PipeTransform {

  transform(userObj:DelegateModel, tennantObj:TennantModel): String {
    return this.getUsersTennantJobRole(userObj, tennantObj);
	}

	getUsersTennantJobRole(userObj:DelegateModel, tennantObj:TennantModel):String{
		return !userObj.jobRole ? "Job role not found" : 
			!tennantObj ? userObj.jobRole : `${userObj.jobRole} at ${tennantObj.name}`
	}

}
