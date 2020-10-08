import { CourseTypeModel } from './tennant.model';
export class CoursesModel {
	results:CourseModel[]
}

export class CourseModel {
	name:string
	standardId:string
	scheduledCourseId:string
	id:string
	type:CourseTypeModel
	location:CourseLocationModel
	supplier:CourseSupplierModel
	startDate:string
	duration:CourseDurationModel
	prices:CoursePricesModel
	availability:CourseAvailabilityModel
}
export class CourseLocationModel{
	name:string
}
export class CourseSupplierModel{
	name:string
	id:string
}

export enum CoursePriceCurrency
{
	GBP = "GBP",
	USD = "USD",
	AUD = "AUD",
	EUR = "EUR",
}

export class CourseDurationModel {
	days:number
	hours:number
}

export class CoursePricesModel {
	currency:string
	total:number
	incVat:boolean
}
export class CourseAvailabilityModel {
	total:number
	available:number
}

export class ScheduledCourseSupplierModel {
	supplier:CourseSupplierModel
	courses:CourseModel[]
}