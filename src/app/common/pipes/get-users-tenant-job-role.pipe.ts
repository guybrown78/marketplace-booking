import { Pipe, PipeTransform } from '@angular/core';
import { DelegateModel } from '../models/delegate.model';
import { TenantModel } from '../models/tenant.model';

@Pipe({
	name: 'getUsersTenantJobRole',
	pure:true
})
export class GetUsersTenantJobRolePipe implements PipeTransform {

  transform(userObj:DelegateModel, tenantObj:TenantModel): String {
    return this.getUsersTenantJobRole(userObj, tenantObj);
	}

	getUsersTenantJobRole(userObj:DelegateModel, tenantObj:TenantModel):String{
		return !userObj.jobRole ? "Job role not found" : 
			!tenantObj ? userObj.jobRole : `${userObj.jobRole} at ${tenantObj.name}`
	}

}
