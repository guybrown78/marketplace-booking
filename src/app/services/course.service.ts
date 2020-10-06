import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BaseService } from './base.service';
import { CoursesModel, CourseModel } from '../common/models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {

	private _courses:CourseModel[]  = [];
	private _allCoursesLoaded: boolean = false;
	//
	constructor(
		http: HttpClient,
	) { 
		super(http)
	}

	public getFilteredCourses(str:string):any[]{
		return this._courses.filter(
			c => c.name.toLowerCase().includes(str)
		);
	}

	// Get All Courses
	getCourses() {
		// Are courses loaded?
		if(this._courses.length && this.allCoursesLoaded){
			return of(this._courses);
		}
		// GET ...api/api-courses/db
		return this.http
			.get(this.getDataURL(`api-courses/db`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}
	// public getStaticJSON():any{
	// 	let id = 0;
	// 	const newModels = courseData.map((c,i) => {
	// 		id++
	// 		const obj = {
	// 			"id":String(id),
	// 			"name":String(c.name)
	// 		}
	// 		return obj;
	// 	})
	// 	return { "results":JSON.stringify(newModels) };
	// }

	// GETTERS AND SETTERS
	get courses(): CourseModel[] {
		return this._courses;
	}
	set courses(items:CourseModel[]) {
		this._courses = items;
	}

	get allCoursesLoaded():boolean{
		return this._allCoursesLoaded;
	}
	set allCoursesLoaded(value:boolean){
		this._allCoursesLoaded = value;
	}
}
