import { CourseTypeModel } from './tenant.model';
import { DelegateModel } from './delegate.model'
import { ErrorModel } from './error.model';

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
	locations:CourseLocationModel[]
	courses:CourseModel[]
}

// Save Courses
export class SavedCoursesModel {
	results:SaveCourseModel[]
}
export class SaveCourseModel {
	scheduledCourseId:string
	standardId:string
	course:CourseModel
	delegates:DelegateModel[]
  prices:CoursePricesModel
	additionalNotes:AdditionalNotesModel
}

export class SaveCourseResponseModel {
	results:CourseModel[]
	errors:ErrorModel[]
}
export class AdditionalNotesModel {
	poNumber:string
	level:string
	tmsCost:string
	trainingReason:string
}


export class BookingItemItentifierModel {
	scheduledCourseId:string
	delegateId:string
}
