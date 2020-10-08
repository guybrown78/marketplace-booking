import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
// services
import { TennantService } from '../services/tennant.service'
import { DelegateService } from '../services/delegate.service'
import { CourseService } from '../services/course.service'
// common
import { AppError } from '../common/errors/app.error';
import { DelegateModel } from '../common/models/delegate.model';
import { DelegatesModel } from '../common/models/delegates.model';
import { CourseModel, CoursesModel, CourseLocationModel } from '../common/models/courses.model';
import { CourseTypeModel } from '../common/models/tennant.model'
import { GetUsersFullNamePipe } from '../common/pipes/get-users-full-name.pipe';
import { GetUsersTennantJobRolePipe } from '../common/pipes/get-users-tennant-job-role.pipe';

interface TypeOption {
  label: string;
  value: string;
}

@Component({
	selector: 'search-filters',
	encapsulation: ViewEncapsulation.None,
  templateUrl: './search-filters.component.html',
	styleUrls: ['./search-filters.component.css'],
	providers:[
		GetUsersTennantJobRolePipe
	]
})

export class SearchFiltersComponent implements OnInit {

	error:string = null;
	searchCompleteSubscription: Subscription;

	dateFormat = 'dd/MM/yyyy';
	searchFiltersForm!: FormGroup;
	//
	delegateOptions: DelegateModel[] = [];
	delegatesLoading:boolean = false;
	selectedDelegate:DelegateModel = null;
	//
	courseOptions: CourseModel[] = [];
	coursesLoading:boolean = false;
	// selectedCourse:CourseModel = null;
	//
	typeOptions: CourseTypeModel[] = null;
	locationOptions:CourseLocationModel[] = null;
	
  constructor(
		private fb: FormBuilder,
		public tennantService: TennantService,
		private delegateService: DelegateService,
		public courseService: CourseService,
		private getUsersFullName: GetUsersFullNamePipe,
		private getUsersTennantJobRole: GetUsersTennantJobRolePipe
	) {
		this.searchCompleteSubscription = courseService.searchConfirmed$.subscribe(
			() => this.onCourseSeacrchComplete()
		)

	}

  ngOnInit(): void {
		// this.fetchDelegateData();
    this.searchFiltersForm = this.fb.group({
      delegate: [null],
      course: [null, [Validators.required]],
      type: [null],
      location: [null],
      startDate: [null],
		});
		//
	}
	
	fetchDelegateData(){
		this.delegateService.getDelegates()
			.subscribe((delegates:DelegatesModel) => {
				this.delegateService.delegates = delegates.results
			}, (error: AppError) => {
				this.error = "Sorry, something went wrong loading the delegates";
			});
	}

	submitForm(): void {
		if(this.courseService.course){
			this.resetFilters();
			this.courseService.announceSearch();
		}
  }

	onDelegateInput(event: Event): void {
		const value = (event.target as HTMLInputElement).value;
		this.delegatesLoading = true;
		//
		this.delegateService.getDelegates()
			.subscribe((delegates:DelegatesModel) => {
				if(!this.delegateService.allDelegatesLoaded){
					this.delegateService.delegates = delegates.results;
					this.delegateService.allDelegatesLoaded = true;
				}
					this.delegateOptions = this.delegateService.getFilteredDelegated(value.toLocaleLowerCase());
					this.delegatesLoading = false;
			}, (error: AppError) => {
				this.error = "Sorry, something went wrong loading the delegates";
			});
	}
	onDelegateAutoSelected(delegate:DelegateModel){
		this.selectedDelegate = delegate;
	}
	//
	onCourseInput(event: Event): void {
		const value = (event.target as HTMLInputElement).value;
		this.coursesLoading = true;
		//
		this.courseService.getCourses()
			.subscribe((courses:CoursesModel) => {
				if(!this.courseService.allCoursesLoaded){
					this.courseService.courses = courses.results;
					this.courseService.allCoursesLoaded = true;
				}
				this.courseOptions = this.courseService.getFilteredCourses(value.toLocaleLowerCase());
				this.coursesLoading = false;
			}, (error: AppError) => {
				this.error = "Sorry, something went wrong loading the courses";
			});
	}
	onCoursesAutoSelected(course:CourseModel){
		this.courseService.course = course;
	}

	onCourseSeacrchComplete(){
		this.typeOptions = this.courseService.parsedResults.courseTypes;
		this.locationOptions = this.courseService.parsedResults.locations;
	}
	resetFilters(){
		this.typeOptions = null;
		this.locationOptions = null;
	}
}
