import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { BaseService } from './base.service';
import { CoursesModel, CourseModel } from '../common/models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {

	private _course:CourseModel = null;
	private _courses:CourseModel[]  = [];
	private _allCoursesLoaded: boolean = false;
	//
	// Observable sources
	private searchAnnouncedSource = new Subject();
	private searchConfirmedSource = new Subject();
	//
	// Observable streams
	searchAnnounced$ = this.searchAnnouncedSource.asObservable();
	searchConfirmed$ = this.searchConfirmedSource.asObservable();
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

	// Get All Courses
	getCourseSchedules(standardId:string) {
		console.log("get course", standardId);
		const epURL = standardId === "133" ? "api-course/db" : `api-course-${standardId}/db`
		// GET ...api/api-course/db
		return this.http
			.get(this.getDataURL(epURL), { ...this.requestOptions() })
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

	// Service message commands
	announceSearch() {
		this.searchAnnouncedSource.next();
	}

	confirmSearch() {
		this.searchConfirmedSource.next();
	}
	
	// GETTERS AND SETTERS
	get course(): CourseModel {
		return this._course;
	}
	set course(item:CourseModel) {
		this._course = item;
	}

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
