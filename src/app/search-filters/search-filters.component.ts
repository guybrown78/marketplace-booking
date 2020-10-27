import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
// services
import { UrlDataService } from '../services/url-data.service'
import { TenantService } from '../services/tenant.service'
import { DelegateService } from '../services/delegate.service'
import { CourseService } from '../services/course.service'
// common
import { AppError } from '../common/errors/app.error';
import { DelegateModel } from '../common/models/delegate.model';
import { DelegatesModel } from '../common/models/delegates.model';
import { CourseModel, CoursesModel, CourseLocationModel } from '../common/models/courses.model';
import { CourseTypeModel } from '../common/models/tenant.model'
import { GetUsersFullNamePipe } from '../common/pipes/get-users-full-name.pipe';
import { GetUsersTenantJobRolePipe } from '../common/pipes/get-users-tenant-job-role.pipe';

import { _mpConfigAltFormURL } from '../../config'
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
		GetUsersTenantJobRolePipe
	]
})

export class SearchFiltersComponent implements OnInit {

	inited:boolean = false;
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
	disableFilters:boolean = true;
	//
	forceCloseTT:boolean = false;
	nzTooltipTriggerEvent:string = 'hover';
	//
	initialSearchComplete:boolean = false;
	altFormUrl:string = _mpConfigAltFormURL;
	//
	
	//
  constructor(
		private fb: FormBuilder,
		private urlService: UrlDataService,
		public tenantService: TenantService,
		private delegateService: DelegateService,
		public courseService: CourseService,
		private getUsersFullName: GetUsersFullNamePipe,
		private getUsersTenantJobRole: GetUsersTenantJobRolePipe
	) {
		this.searchCompleteSubscription = courseService.searchConfirmed$.subscribe(
			() => this.onCourseSeacrchComplete()
		)

	}

  ngOnInit(): void {
		this.clearUpToolTips();
		//
		const values = this.courseService.searchFiltersFormValues
		this.searchFiltersForm = this.fb.group({
			delegate: [values ? values.delegate : null],
			delegateId: [values ? values.delegateId : null],
			course: [values ? values.course : null, [Validators.required]],
			courseId: [values ? values.courseId : null],
      type: [values ? values.type : null],
      location: [values ? values.location : null],
      startDate: [values ? values.startDate : null],
		});
		if(values){
			if(values.delegateId){
				this.fetchDefaultDelegate(values.delegateId);
			}
			if(values.courseId){
				this.submitForm();
			}
		}
		// check entry delegates
		if(this.urlService.entryData.delegateIds.length){
			// load with delegate from query string
			this.fetchDefaultDelegate(this.urlService.entryData.delegateIds[0])
		}else{
			setTimeout(() => {
				this.inited = true;
			}, 25)
		}
	}
	
	fetchDefaultDelegate(delegateId:string){
		// set the input to touched to stop the flicker of the tooltip if takes a while to load the delegate
		this.searchFiltersForm.controls['delegate'].markAsTouched()
		// load the delegate
		this.delegateService.getDelegatesFromId(delegateId).subscribe((delegate:DelegateModel) => {
			this.onDelegateAutoSelected(delegate)
			// update form value with delegates name
			this.searchFiltersForm.controls['delegate'].setValue(this.getUsersFullName.transform(delegate));
			setTimeout(() => {
				this.searchFiltersForm.controls['delegate'].markAsTouched()
				this.onForceCloseTT();
				this.inited = true;
			}, 25)
			
		},(error: AppError) => {
			// if error, make sure you set the delegate input to untouched to show the tooltip
			this.searchFiltersForm.controls['delegate'].markAsUntouched()
			this.error = "Sorry, couldn't load the delegate";
			this.inited = true;
			console.log("error loading the delegate")
		})
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
			this.onForceCloseTT();
			this.resetFilters();
			this.courseService.searchFiltersFormValues = this.searchFiltersForm.value;
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
		this.searchFiltersForm.controls['delegateId'].setValue(delegate.id);
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
		this.searchFiltersForm.controls['courseId'].setValue(course.standardId);
		this.searchFiltersForm.controls['type'].setValue(null);
		this.searchFiltersForm.controls['location'].setValue(null);
		this.searchFiltersForm.controls['startDate'].setValue(null);
	}

	onCourseSeacrchComplete(){
		this.initialSearchComplete = true;
		this.typeOptions = this.courseService.parsedResults.courseTypes;
		this.locationOptions = this.courseService.parsedResults.locations;
		this.disableFilters = false;
		this.searchFiltersForm.markAsPristine()
	}
	

	resetFilters(){
		this.typeOptions = null;
		this.locationOptions = null;
		this.disableFilters = true;
	}

	onForceCloseTT(){
		this.forceCloseTT = true;
		this.nzTooltipTriggerEvent = null;
	}

	clearUpToolTips(){
		const el = document.querySelector('.delegate-tooltip');
		if(el){
			el.parentNode.removeChild(el);
		}
	}
	ngOnDestroy(){
		this.clearUpToolTips();
	}
}
