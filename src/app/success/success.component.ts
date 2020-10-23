import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SaveCourseService } from '../services/save-course.service';
import { SaveCourseModel, SavedCoursesModel, CoursePriceCurrency, AdditionalNotesModel, BookingItemItentifierModel } from '../common/models/courses.model';

import { GetNumberLabelPipe } from '../common/pipes/get-number-label.pipe'
import { GetDisplayDatePipe } from '../common/pipes/get-display-date.pipe'
import { GetUsersFullNamePipe } from '../common/pipes/get-users-full-name.pipe';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
	providers:[
		GetNumberLabelPipe,
		GetDisplayDatePipe,
		GetUsersFullNamePipe
	],
})
export class SuccessComponent implements OnInit {
	error:string = null;
	isLoading:boolean = false;
	courses:SavedCoursesModel = null;
	//
  constructor(
		private router: Router,
		private route: ActivatedRoute,
		public saveCourseService: SaveCourseService,
		private getNumberLabel:GetNumberLabelPipe,
		private getDisplayDate:GetDisplayDatePipe,
		private getUsersFullName: GetUsersFullNamePipe,
	) {
		this.courses = saveCourseService.successCourses;
		console.log(this.courses);
	}

  ngOnInit(): void {
  }

	onReset(){
		console.log(".......")
		this.router.navigate([`/search`]);
	}
}
