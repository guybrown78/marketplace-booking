import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseModel } from '../../common/models/courses.model'
import { GetNumberLabelPipe } from '../../common/pipes/get-number-label.pipe'
import { GetDisplayDatePipe } from '../../common/pipes/get-display-date.pipe'
import { GetCoursePricePipe } from '../../common/pipes/get-course-price.pipe'
import { GetCourseTaxPipe } from '../../common/pipes/get-course-tax.pipe'
import { GetCourseDurationPipe } from '../../common/pipes/get-course-duration.pipe'
@Component({
  selector: 'schedule-item',
  templateUrl: './schedule-item.component.html',
	styleUrls: ['./schedule-item.component.css'],
	providers:[
		GetNumberLabelPipe,
		GetDisplayDatePipe,
		GetCoursePricePipe,
		GetCourseTaxPipe,
		GetCourseDurationPipe
	]
})
export class ScheduleItemComponent implements OnInit {

	@Input('course') course:CourseModel;
	@Input('showBookButton') showBookButton:Boolean = true;
  constructor(
		private router: Router,
		private getNumberLabel:GetNumberLabelPipe,
		private getDisplayDate:GetDisplayDatePipe,
		private getCoursePrice:GetCoursePricePipe,
		private getCourseTax:GetCourseTaxPipe,
		private getCourseDuration:GetCourseDurationPipe,
	) { }

  ngOnInit(): void {
	}
	
	onCourseBook(){
		this.router.navigate([`/add-delegates/${this.course.scheduledCourseId}`]);
	}

}
