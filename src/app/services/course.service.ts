import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { BaseService } from './base.service';
import { CourseTypeModel } from '../common/models/tennant.model';
import { CoursesModel, CourseModel, CourseSupplierModel, CourseLocationModel, ScheduledCourseSupplierModel } from '../common/models/courses.model';
//
import * as moment from 'moment';

interface SearchResultsInterface {
	hasResults:boolean;
	suppliers:CourseSupplierModel[];
	courseTypes:CourseTypeModel[];
	locations:CourseLocationModel[];
	scheduledCourses:CourseModel[];
	scheduledCourseSuppliers:ScheduledCourseSupplierModel[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {

	private _course:CourseModel = null;
	private _courses:CourseModel[]  = [];
	private _allCoursesLoaded: boolean = false;
	//
	private _parsedResults:SearchResultsInterface = null;
	private _searchFiltersFormValues:any = null;
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

	parseSearchResults(results:CourseModel[]){
		let filteredResults:CourseModel[] = [ ...results ];
		// location
		if(this.searchFiltersFormValues.location){
			filteredResults = filteredResults.filter(c => c.location.name.toLocaleLowerCase() === this.searchFiltersFormValues.location.toLocaleLowerCase());
		}
		if(this.searchFiltersFormValues.startDate){
			console.log("DATE")
			console.log(this.searchFiltersFormValues.startDate);
			const sd = moment(this.searchFiltersFormValues.startDate)
			console.log("startDate",sd.format("DD/MM/YYYY"))
			filteredResults = filteredResults.filter(c => {
				const cd = moment(c.startDate, 'DD/MM/YYYY')
				// const after = moment(cd).isAfter(sd, 'day');
				const sameOrAfter = moment(cd).isSameOrAfter(sd, 'day');
				console.log(c.startDate, sameOrAfter, cd.format("DD/MM/YYYY"))
				if(sameOrAfter){
					return c;
				}
			})
		}
		//
		let obj:SearchResultsInterface = {
			scheduledCourses:[ ...filteredResults ],
			hasResults:filteredResults.length > 0,
			suppliers:[],
			courseTypes:[],
			locations:[],
			scheduledCourseSuppliers:[]
		}
		// Set the Overall Results filters
		results.map(c => {
			if (!obj.suppliers.some(s => s.id === c.supplier.id)) {
				/* doesn't contain the element so add it */
				obj.suppliers.push(c.supplier);
			}
			if (!obj.courseTypes.some(ct => ct.id === c.type.id)) {
				obj.courseTypes.push(c.type);
			}
			if (!obj.locations.some(l => l.name.toLocaleLowerCase() === c.location.name.toLocaleLowerCase())) {
				obj.locations.push(c.location);
			}
		})
		//
		let filteredSuppliers:CourseSupplierModel[] = [];
		// let filteredCourseTypes:CourseTypeModel[];
		// let filteredLocations:CourseLocationModel[];
		filteredResults.map(fc => {
			if (!filteredSuppliers.some(fs => fs.id === fc.supplier.id)) {
				filteredSuppliers.push(fc.supplier);
			}
			// if (!filteredCourseTypes.some(fct => fct.id === fc.type.id)) {
			// 	filteredCourseTypes.push(fc.type);
			// }
		})
		obj.scheduledCourseSuppliers = filteredSuppliers.map(s => {
			// map the available supliers to filter courses
			const courses = filteredResults.filter(c => c.supplier.id === s.id)
			return { supplier:s, courses };
		})
		this.parsedResults = obj;
	}
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

	get parsedResults():SearchResultsInterface{
		return this._parsedResults;
	}
	set parsedResults(results:SearchResultsInterface){
		this._parsedResults = results;
	}
	
	get searchFiltersFormValues():any{
		return this._searchFiltersFormValues;
	}
	set searchFiltersFormValues(values:any){
		this._searchFiltersFormValues = values;
	}

}
