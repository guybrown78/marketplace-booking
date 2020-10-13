import { Component, OnInit } from '@angular/core';
import { UrlDataService } from '../services/url-data.service';
import { CourseService } from '../services/course.service';
import { CourseModel, CoursesModel, ScheduledCourseSupplierModel } from '../common/models/courses.model';
import { Subscription, Observable } from 'rxjs';
import { AppError } from '../common/errors/app.error';

import { GetNumberLabelPipe } from '../common/pipes/get-number-label.pipe';
import { GetDisplayDatePipe } from '../common/pipes/get-display-date.pipe'

import { _mpConfigAltFormURL } from '../../config'

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
	styleUrls: ['./search-results.component.css'],
	providers:[
		GetNumberLabelPipe,
		GetDisplayDatePipe
	]
})
export class SearchResultsComponent implements OnInit {

	error:string = null;
	searchSubscription: Subscription;
	//
	hasSearched:boolean = false;
	isLoading:boolean = false;
	scheduledCourses:CourseModel[];
	scheduledCourseSuppliers:ScheduledCourseSupplierModel[];

	altFormUrl:string = _mpConfigAltFormURL;

  constructor(
		public urlService: UrlDataService,
		public courseService: CourseService,
		private getNumberLabel: GetNumberLabelPipe,
		private getDisplayDate:GetDisplayDatePipe
	) {
		this.searchSubscription = courseService.searchAnnounced$.subscribe(
			() => {
				this.searchCourses();
			}
		)
	}

  ngOnInit(): void {
  }

	searchCourses(){
		this.hasSearched = true;
		this.isLoading = true;
		this.error = null;
		this.courseService.getCourseSchedules(this.courseService.course.standardId)
			.subscribe((scheduledCourses:CoursesModel) => {
				this.courseService.parseSearchResults(scheduledCourses.results);
				console.log(this.courseService.parsedResults);
				this.isLoading = false;
				this.courseService.confirmSearch();
			}, (error: AppError) => {
				this.error = "Sorry, something went wrong trying to search for your course.";
				this.isLoading = false;
				this.scheduledCourses = null;
				this.scheduledCourseSuppliers = null;
			});
	}
}
