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
import { SaveCourseModel, SavedCoursesModel, CoursePriceCurrency } from '../common/models/courses.model';
import { _mpConfigTaxValue, _mpConfigTaxLabel } from '../../config'

@Component({
  selector: 'app-book-course',
  templateUrl: './book-course.component.html',
	styleUrls: ['./book-course.component.css'],
	providers:[
		GetCoursePricePipe,
		GetDisplayPricePipe
	]
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
		console.log(this.courses)
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
		console.log("do nothing just yet")
	}

	onConfirmBtnClicked(){
		console.log("CONFIRM BOOKING")
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
}
