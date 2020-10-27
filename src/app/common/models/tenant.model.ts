export class TenantModel {
	id:string
	name:string
	apiSuffix:string
	availableCourseTypes:CourseTypeModel[]
}

export class TenantsModel {
	results:TenantModel[]
}

export class CourseTypeModel {
	name:string
  id:string
  value:string
}