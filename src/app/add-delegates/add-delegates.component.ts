import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
// services
import { TenantService } from '../services/tenant.service'
import { DelegateService } from '../services/delegate.service'
import { CourseService } from '../services/course.service';
import { SaveCourseService } from '../services/save-course.service';
//
import { DelegateModel } from '../common/models/delegate.model';
import { DelegatesModel } from '../common/models/delegates.model';
import { CourseModel, CoursesModel, SavedCoursesModel, SaveCourseModel, ScheduledCourseSupplierModel } from '../common/models/courses.model';
import { AppError } from '../common/errors/app.error';

import { GetNumberLabelPipe } from '../common/pipes/get-number-label.pipe'
import { GetPluralWordPipe } from '../common/pipes/get-plural-word.pipe'
import { GetUsersFullNamePipe } from '../common/pipes/get-users-full-name.pipe';
import { GetUsersTenantJobRolePipe } from '../common/pipes/get-users-tenant-job-role.pipe';

import { fadeInOutAnimation, delegateInOutAnimation } from '../common/animations';

@Component({
  selector: 'app-add-delegates',
  templateUrl: './add-delegates.component.html',
	styleUrls: ['./add-delegates.component.css'],
	providers:[
		GetNumberLabelPipe,
		GetPluralWordPipe,
		GetUsersTenantJobRolePipe
	],
	animations: [ delegateInOutAnimation, fadeInOutAnimation ]
})
export class AddDelegatesComponent implements OnInit {

	error:string = null;
	isLoading:boolean = true;
	course:CourseModel;
	delegateForm!: FormGroup;
	//
	delegateOptions: DelegateModel[] = [];
	delegatesLoading:boolean = false;
	selectedDelegates:DelegateModel[] = [];
	preloadDelegates:any[] = [];
	//
	availableSpaces:number = 0;
	placeholder:string = "";
	//
  constructor(
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		public tenantService: TenantService,
		public courseService: CourseService,
		public saveCourseService: SaveCourseService,
		private delegateService: DelegateService,
		private getNumberLabel:GetNumberLabelPipe,
		private getPluralWord:GetPluralWordPipe,
		private getUsersFullName: GetUsersFullNamePipe,
		private getUsersTenantJobRole: GetUsersTenantJobRolePipe
	) { }

  ngOnInit(): void {
		// get the scheduledCourseId id from the route
		const scheduledCourseId = this.route.snapshot.paramMap.get('scheduledCourseId');
		//
		this.isLoading = true;
		//
		this.delegateForm = this.fb.group({
      delegate: [null],
		});
		// work out where to get the data from...
		const savedCourse:SaveCourseModel = this.saveCourseService.getSavedCourse(scheduledCourseId);

		if(savedCourse){
			// coming back, stored...
			this.course = savedCourse.course;
			this.selectedDelegates = savedCourse.delegates;
			this.availableSpaces = this.calculateAvailableSpaces()
			this.isLoading = false;
			//
		}else{
			if(this.courseService.searchFiltersFormValues && this.courseService.searchFiltersFormValues.delegateId){
				this.preloadDelegates.push(this.courseService.searchFiltersFormValues.delegateId);
			}
			this.fetchCourse(scheduledCourseId);
			//
		}
  }

	fetchCourse(scheduledCourseId:string){
		this.courseService.getSchedule(scheduledCourseId)
			.subscribe((scheduledCourse:CourseModel) => {
				//
				this.course = scheduledCourse;
				//
				if(this.preloadDelegates.length){
					// load the delegate 
					this.delegateService.getDelegatesFromId(this.preloadDelegates[0]).subscribe((delegate:DelegateModel) => {
						this.selectedDelegates.push(delegate);
						this.availableSpaces = this.calculateAvailableSpaces()
						this.isLoading = false;
					},(error: AppError) => {
						// fail gracefully
					})
				}else{
					this.availableSpaces = this.calculateAvailableSpaces()
					this.isLoading = false;
				}
				//
				
			}, (error: AppError) => {
				this.error = "Sorry, something went wrong trying to search for your course.";
				this.isLoading = false;
		});
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
		if(!this.delegateExistsInSelectedList(delegate)){
			this.selectedDelegates.push(delegate);
			this.delegateForm.controls['delegate'].setValue(null);
			this.availableSpaces = this.calculateAvailableSpaces()
		}
		
	}

	onRemoveDelegate(delegate:DelegateModel){
		const index = this.selectedDelegates.findIndex(d => d.id === delegate.id);
		this.selectedDelegates.splice(index, 1);
		this.availableSpaces = this.calculateAvailableSpaces();
	}
	onBackBtnClicked(){
		this.router.navigate([`/search`]);
	}
	onSkipBtnClicked(){
		// this.router.navigate([`/confirm`]);
		this.onContinueBtnClicked()
	}
	onContinueBtnClicked(){
		this.saveCourseService.saveCourse(this.course, this.selectedDelegates);
		this.saveCourseService.lastScheduledCourseId = this.course.scheduledCourseId;
		//
		this.router.navigate([`/confirm`]);
	}
	public delegateExistsInSelectedList(delegate:DelegateModel):boolean{
		return this.selectedDelegates.filter(d => d.id === delegate.id).length > 0;
	}

	public calculateAvailableSpaces():number{
		let n = this.course.availability.available;
		if(this.selectedDelegates){
			n = n - this.selectedDelegates.length;
		}
		if(n < 0){
			n = 0;
		}
		// quick check to disable form if no spots left
		n === 0 ? this.delegateForm.disable() : this.delegateForm.enable();
		this.placeholder = this.delegateForm.disabled ? "You’ve added the maximum number of delegates to this course" : "Start typing delegates name"
		return n;
	}
}
