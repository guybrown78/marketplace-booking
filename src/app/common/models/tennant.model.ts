export class TennantModel {
	id:string
	name:string
	apiSuffix:string
	availableCourseTypes:CourseTypeModel[]
}

export class TennantsModel {
	results:TennantModel[]
}

export class CourseTypeModel {
	name:string
  id:string
  value:string
}