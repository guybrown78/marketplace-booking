import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// services
import { TennantService } from '../services/tennant.service'
import { CourseService } from '../services/course.service';
import { SaveCourseService } from '../services/save-course.service';
import { UrlDataService } from '../services/url-data.service';
//
import { GetCoursePricePipe } from '../common/pipes/get-course-price.pipe'
import { GetDisplayPricePipe } from '../common/pipes/get-display-price.pipe'
import { 
	SavedCoursesModel, 
	SaveCourseResponseModel, 
	CoursePriceCurrency, 
	AdditionalNotesModel, 
	BookingItemItentifierModel 
} from '../common/models/courses.model';
import { ErrorTypeEnum } from '../common/models/error.model';

import { _mpConfigTaxValue, _mpConfigTaxLabel } from '../../config'
//
import { AppError } from '../common/errors/app.error';

import { fadeInOutAnimation, delegateInOutAnimation } from '../common/animations';
@Component({
  selector: 'app-book-course',
  templateUrl: './book-course.component.html',
	styleUrls: ['./book-course.component.css'],
	providers:[
		GetCoursePricePipe,
		GetDisplayPricePipe
	],
	animations: [ delegateInOutAnimation, fadeInOutAnimation ]
})
export class BookCourseComponent implements OnInit {

	error:string = null;
	isLoading:boolean = false;
	courses:SavedCoursesModel = null;
	//
	subTotal:number;
	discount:number;
	vat:number;
	total:number;
	currency:CoursePriceCurrency;
	//
	isSubmitting:boolean = false;
	//
  constructor(
		private router: Router,
		private route: ActivatedRoute,
		public urlService: UrlDataService,
		public tennantService: TennantService,
		public courseService: CourseService,
		public saveCourseService: SaveCourseService,
		private getCoursePrice:GetCoursePricePipe,
		private getDisplayPrice:GetDisplayPricePipe,
		
	) {
		this.courses = saveCourseService.savedCourses;
	}

	ngOnInit(): void {
		this.calculateTotals();
	}
	
	onBackBtnClicked(){
		if(this.saveCourseService.lastScheduledCourseId){
			this.router.navigate([`/add-delegates/${this.saveCourseService.lastScheduledCourseId}`]);
			return null;
		}
		this.router.navigate([`/search`]);
	}

	onAddMoreCoursesBtnClicked(){
		console.log("do nothing just yet - multi courses is phase 2")
	}

	onConfirmBtnClicked(){
		this.isSubmitting = true;
		// save()

		this.saveCourseService
			.save()
			.subscribe((successCourse:SaveCourseResponseModel) => {
				setTimeout(() => {
					if(successCourse.errors){
						if(successCourse.errors[successCourse.errors.length - 1].type == ErrorTypeEnum.SPACES_UNAVAILABLE){
							console.log(" error - spaces ")
							this.isSubmitting = false;
							this.router.navigate([`/unsuccessful`]);
						}else{
							console.log(" error - general");
							this.isSubmitting = false;
							this.router.navigate([`/unsuccessful`]);
						}
						return null;
					}
					else if(successCourse.results){
						this.isSubmitting = false;
						this.saveCourseService.switchSavedToSuccess();
						this.router.navigate([`/success`]);
						return null;
					}
					console.log("no error or results found. Just tidy up!")
					this.isSubmitting = false;
				}, 50)
			}, (error: AppError) => {
				this.isSubmitting = false;
				this.router.navigate([`/unsuccessful`]);
			})


		
	}

	additionalNotesChange(additionalNotesValues:AdditionalNotesModel){
		//console.log(additionalNotesValues)
		const scheduledCourseId:string = this.courses.results[0].scheduledCourseId
		this.saveCourseService.updateAdditionalNotes(scheduledCourseId, additionalNotesValues)
	}

	calculateTotals(){
		if(!this.courses){
			return null;
		}
		let subTotal:number = 0;
		let tax:number = 0;
		// let discount:number = 0;
		this.courses.results.map(sc => {
			subTotal = subTotal + sc.prices.total;
			if(!sc.prices.incVat){
				tax = tax + ((sc.prices.total * _mpConfigTaxValue) - sc.prices.total);
			}
		});
		this.subTotal = subTotal;
		this.vat = tax;
		this.discount = 0;
		this.total = subTotal + tax;
		this.currency = CoursePriceCurrency.GBP;
	}

	removeBookingItem(bookingItem:BookingItemItentifierModel){
		this.saveCourseService.removeBookingItem(bookingItem);
		this.courses = this.saveCourseService.savedCourses;
		let isDelegates:boolean = true;
		this.courses.results.map(c => isDelegates = c.delegates.length > 0);
		if(isDelegates){
			this.calculateTotals();
		}else{
			this.courses = null;
		}
	}
}
