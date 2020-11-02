import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { BaseService } from './base.service';
import { UrlDataService } from './url-data.service';
import { CourseTypeModel } from '../common/models/tenant.model';
import { 
	CourseModel, 
	CourseSupplierModel, 
	CourseLocationModel, 
	ScheduledCourseSupplierModel 
} from '../common/models/courses.model';
//
import * as moment from 'moment';


interface SearchResultsInterface {
	hasResults:boolean;
	suppliers:CourseSupplierModel[];
	courseTypes:CourseTypeModel[];
	locations:CourseLocationModel[];
	filteredLocations:CourseLocationModel[];
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
		urlDataService:UrlDataService,
	) { 
		super(http, urlDataService)
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
			.get(this.getDataURL(`mp/courses/names`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}

	searchCourses(searchValue:string) {
		return this.http
			.get(this.getDataURL(`mp/courses/names?search=name|${searchValue}`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}

	// Get All Courses
	getCourseSchedules(standardId:string) {
		return this.http
			.get(this.getDataURL(`mp/courses/available?standardId=${standardId}`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}

	// Get All Single Scheduled Course
	getSchedule(scheduleCourseId:string) {
		// GET ...api/api-course/rusults/
		return this.http
			.get(this.getDataURL(`mp/courses/available?scheduledCourseId=${scheduleCourseId}`), { ...this.requestOptions() })
			.pipe(catchError(this.handleError));
	}

		
	parseSearchResults(results:CourseModel[]){
		let filteredResults:CourseModel[] = [ ...results ];
		// location
		if(this.searchFiltersFormValues.location && this.searchFiltersFormValues.location !== "All"){
			filteredResults = filteredResults.filter(c => c.location.name.toLocaleLowerCase() === this.searchFiltersFormValues.location.toLocaleLowerCase());
		}
		if(this.searchFiltersFormValues.startDate){
			const sd = moment(this.searchFiltersFormValues.startDate)
			filteredResults = filteredResults.filter(c => {
				const cd = moment(c.startDate, 'DD/MM/YYYY')
				// const after = moment(cd).isAfter(sd, 'day');
				const sameOrAfter = moment(cd).isSameOrAfter(sd, 'day');
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
			filteredLocations:[],
			scheduledCourseSuppliers:[]
		}
		// Set the Overall Results filters
		results.map(c => {
			if (!obj.suppliers.some(s => s.id === c.supplier.id)) {
				/* doesn't contain the element so add it */
				obj.suppliers.push(c.supplier);
			}
			if(c.type){
				if (!obj.courseTypes.some(ct => ct.id === c.type.id)) {
					obj.courseTypes.push(c.type);
				}
			}
			if (!obj.locations.some(l => l.name.toLocaleLowerCase() === c.location.name.toLocaleLowerCase())) {
				obj.locations.push(c.location);
			}
		})
		//
		if(obj.locations.length){
			obj.locations.unshift({
				name:"All"
			} as CourseLocationModel)
		}
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
			if (!obj.filteredLocations.some(fl => fl.name.toLocaleLowerCase() === fc.location.name.toLocaleLowerCase())) {
				obj.filteredLocations.push(fc.location);
			}
		})
		obj.scheduledCourseSuppliers = filteredSuppliers.map(s => {
			// map the available supliers to filter courses
			const courses = filteredResults.filter(c => c.supplier.id === s.id)
			const locations = []
			courses.map(fsc => {
				if (!locations.some(frl => frl.name.toLocaleLowerCase() === fsc.location.name.toLocaleLowerCase())) {
					locations.push(fsc.location);
				}
			})
			return { supplier:s, courses, locations };
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
