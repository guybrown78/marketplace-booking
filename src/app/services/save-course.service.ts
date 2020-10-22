import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { BaseService } from './base.service';

import { 
	CoursesModel, 
	CourseModel, 
	CourseSupplierModel, 
	CourseLocationModel, 
	ScheduledCourseSupplierModel, 
	SavedCoursesModel, 
	SaveCourseModel, 
	BookingItemItentifierModel 
} from '../common/models/courses.model';
import { DelegateModel } from '../common/models/delegate.model';

@Injectable({
  providedIn: 'root'
})
export class SaveCourseService extends BaseService {

	private _savedCourses:SavedCoursesModel = null;
	private _lastScheduledCourseId:string;

  constructor(
		http: HttpClient,
	) { 
		super(http)
	}

	saveCourse(course:CourseModel, delegates:DelegateModel[]){
		const sCourses:SaveCourseModel[] = this.savedCourses ? [ ...this.savedCourses.results ] : [];
		const alreadyExists:boolean = sCourses.filter(sc => sc.scheduledCourseId === course.scheduledCourseId).length > 0;
		//
		if(!alreadyExists){
			// Create and Add
			// calculate totalPrice
			const totalPrice:number = course.prices.total * delegates.length;
			// compile model
			const savedCourse:SaveCourseModel = {
				scheduledCourseId: course.scheduledCourseId,
				standardId: course.standardId,
				course,
				delegates,
				prices:{
					total:totalPrice,
					currency:course.prices.currency,
					incVat:course.prices.incVat
				},
				additionalNotes:{
					poNumber:"",
					level:"",
					tmsCost:"",
					trainingReason:""
				}
			}
			// add
			sCourses.push(savedCourse);
			this.savedCourses = { results:sCourses } as SavedCoursesModel;
			//
		}else{
			// Update existing
		}
	}

	
	getSavedCourse(scheduledCourseId:string):SaveCourseModel{
		const sCourses:SaveCourseModel[] = this.savedCourses ? [ ...this.savedCourses.results ] : [];
		const index:number = sCourses.findIndex(sc => sc.scheduledCourseId === scheduledCourseId)
		if(index >= 0){
			return this.savedCourses.results[index];
		}
		return null;
	}

	removeBookingItem(bookingItem:BookingItemItentifierModel){

		// get course
		const sCourses:SaveCourseModel[] = this.savedCourses ? [ ...this.savedCourses.results ] : [];
		const index:number = sCourses.findIndex(sc => sc.scheduledCourseId === bookingItem.scheduledCourseId)
		if(index >= 0){
			const course:SaveCourseModel = this.savedCourses.results[index];
			// get delegate
			const delegateIndex:number = course.delegates.findIndex(cd => cd.id === bookingItem.delegateId);
			if(delegateIndex >= 0){
				// remove delegate
				course.delegates.splice(delegateIndex, 1);
				course.prices.total = course.course.prices.total * course.delegates.length;
				//
				this.savedCourses = { results:sCourses };
			}
		}
	}
	// GETTERS AND SETTERS
	get savedCourses(): SavedCoursesModel {
		return this._savedCourses;
	}
	set savedCourses(items:SavedCoursesModel) {
		this._savedCourses = items;
	}

	get lastScheduledCourseId(): string {
		return this._lastScheduledCourseId;
	}
	set lastScheduledCourseId(value: string) {
		this._lastScheduledCourseId = value;
	}

}
