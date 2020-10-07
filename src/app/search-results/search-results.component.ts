import { Component, OnInit } from '@angular/core';
import { UrlDataService } from '../services/url-data.service';
import { CourseService } from '../services/course.service';
import { CourseModel, CoursesModel } from '../common/models/courses.model';
import { Subscription, Observable } from 'rxjs';
import { AppError } from '../common/errors/app.error';
@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

	error:string = null;
	searchSubscription: Subscription;
	//
	hasSearched:boolean = false;
	isLoading:boolean = false;
	scheduledCourses:CourseModel[];
	// private _selectedCourse:CourseModel;
	// @Input("selectedCourse") set selectedCourse(course:CourseModel) {
	// 	this._selectedCourse = course;
	// 	// Do Something!
	// 	console.log("oh, got it :)")
	// 	console.log(this.selectedCourse);
	// }

	// get selectedCourse(): CourseModel {
	// 	return this._selectedCourse;
	// }

  constructor(
		public urlService: UrlDataService,
		public courseService: CourseService
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
				this.scheduledCourses = [ ...scheduledCourses.results];
				this.isLoading = false;
			}, (error: AppError) => {
				this.error = "Sorry, something went wrong trying to search for your course.";
				this.isLoading = false;
				this.scheduledCourses = null;
			});
	}
}
